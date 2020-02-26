package gov.uspto.patent.ptab.service;

import static gov.uspto.patent.ptab.utils.PTABConstants.SEMI_COLON;
import static gov.uspto.patent.ptab.utils.PTABConstants.SPACE;
import static gov.uspto.patent.ptab.utils.PTABServiceUtils.fetchNodeElements;
import static gov.uspto.patent.ptab.utils.PTABServiceUtils.notFoundIfNullCollection;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.core.io.support.ResourcePatternUtils;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import gov.uspto.patent.ptab.dao.ApplicationUserDao;
import gov.uspto.patent.ptab.dao.StndResourceObjectDao;
import gov.uspto.patent.ptab.domain.AdminColumnDefinition;
import gov.uspto.patent.ptab.domain.ApplicationUser;
import gov.uspto.patent.ptab.domain.ApplicationUserQuery;
import gov.uspto.patent.ptab.domain.ApplicationUserView;
import gov.uspto.patent.ptab.domain.EmployeeDetails;
import gov.uspto.patent.ptab.entities.ApplicationUserEntity;
import gov.uspto.patent.ptab.repository.ApplicationUserRepositoryCriteria;
import lombok.extern.slf4j.Slf4j;

/**
 * Helper class which contains the business process for UserManagement
 *
 * @author 2020 Development Team
 *
 */
@Slf4j
@Component
public class UserManagementService {

	private static final String NO_DATA_FOUND = "no.data.exists";
	private static final String IN_ACTIVE = "InActive";
	private static final String ACTIVE = "Active";
	private static final String COMMA_SPACE = ", ";
	private static final String APPLICATION_USER = "ApplicationUser.json";
	private static final String ADDRESS = "classpath:/gov/uspto/patent/ptab/";
	private static final String YES = "Yes";
	private static final String NO = "No";
	private static final String PTAB = "PTAB";

	@Autowired
	private ApplicationUserDao applicationUserDao;

	@Autowired
	private StndResourceObjectDao stndResourceObjectDao;

	@Autowired
	private ApplicationUserRepositoryCriteria applicationUserRepositoryCriteria;

	@Autowired
	private ResourceLoader resourceLoader;

	/**
	 * This method is used to retrieve user info
	 * 
	 * @param applicationUserQuery
	 * @return
	 */
	@Transactional(readOnly = true)
	public ApplicationUserView getUserInfo(ApplicationUserQuery applicationUserQuery) {
		final List<ApplicationUserEntity> applicationUserEntityList = applicationUserRepositoryCriteria
				.getUserInfo(applicationUserQuery);
		notFoundIfNullCollection(applicationUserEntityList, NO_DATA_FOUND);
		ApplicationUserView applicationUserView = new ApplicationUserView();
		if (Stream.of(applicationUserQuery.getLoginId(), applicationUserQuery.getUserIdentiifier(),
				applicationUserQuery.getUserWorkerNumber()).allMatch(Objects::isNull)) {
			applicationUserView = buildColumnDetails();
		}
		final List<ApplicationUser> applicationUserReturnList = new ArrayList<>();

		userDataMapping(applicationUserEntityList, applicationUserReturnList);
		applicationUserView.setCaseDetailsData(applicationUserReturnList);
		return applicationUserView;
	}

	/**
	 * This method used for preparing userData
	 */
	private void userDataMapping(final List<ApplicationUserEntity> applicationUserEntityList,
			final List<ApplicationUser> applicationUserReturnList) {
		for (final ApplicationUserEntity applicationUserEntity : applicationUserEntityList) {
			final ApplicationUser applicationUserReturn = new ApplicationUser();
			applicationUserReturn.setFirstName(applicationUserEntity.getFirstNm());
			applicationUserReturn.setLastName(applicationUserEntity.getLastNm());
			applicationUserReturn.setLoginId(applicationUserEntity.getUserId());
			applicationUserReturn.setUserIdentiifier(applicationUserEntity.getApplicationUserId());
			applicationUserReturn.setUserWorkerNumber(applicationUserEntity.getCfkEmployeeId());
			final EmployeeDetails employeeDetails = new EmployeeDetails();
			employeeDetails.setFirstName(applicationUserEntity.getFirstNm());
			employeeDetails.setLastName(applicationUserEntity.getLastNm());
			employeeDetails.setMiddleName(applicationUserEntity.getMiddleNm());
			applicationUserReturn.setFullName(getFullName(employeeDetails));
			applicationUserReturn.setActiveIn(null == applicationUserEntity.getEndEffectiveDt() ? ACTIVE : IN_ACTIVE);
			applicationUserReturn.setEmailAddress(applicationUserEntity.getEmailAddressTx());
			applicationUserReturn.setFaxNumber(applicationUserEntity.getFaxNo());
			applicationUserReturn.setPreferredFullName(applicationUserEntity.getPreferredFullNm());
			applicationUserReturn.setDisiplanceCd(
					applicationUserDao.getDiscipline(applicationUserEntity.getApplicationUserId().toString()));
			applicationUserReturn.setRoleDescription(
					applicationUserDao.getRoleDescription(applicationUserEntity.getApplicationUserId().toString()));
			applicationUserReturn.setJobClassificationCode(applicationUserEntity.getJobClassificationCd());
			if (null != applicationUserEntity.getTrialJudgeIn()) {
				applicationUserReturn.setTrialJudgeIndicator('Y' == applicationUserEntity.getTrialJudgeIn() ? YES : NO);
			}
			if (null != applicationUserEntity.getLeadApjIn()) {
				applicationUserReturn.setLeadApjIndicator('Y' == applicationUserEntity.getLeadApjIn() ? YES : NO);
			}
			applicationUserReturn.setPhoneNumber(applicationUserEntity.getPrimaryTelephoneNo());

			final List<String> privilagesNewDataList = userPrivilagesData(applicationUserEntity);

			applicationUserReturn.setPrivileges(privilagesNewDataList);
			applicationUserReturn.setApjSeniorityRank(applicationUserEntity.getApjSeniorityRankNo());

			applicationUserReturnList.add(applicationUserReturn);

		}
	}

	/**
	 * This method is used to get full name of assignee
	 * 
	 * @param employeeDetails
	 * @return
	 */
	private String getFullName(final EmployeeDetails employeeDetails) {
		if (!StringUtils.isEmpty(employeeDetails.getFirstName()) && employeeDetails.getFirstName().startsWith(PTAB)) {
			String lastName = StringUtils.trimToEmpty(employeeDetails.getLastName());
			if (!StringUtils.isEmpty(lastName)) {
				lastName = SPACE + lastName;
			}
			return StringUtils.trimToEmpty(employeeDetails.getFirstName() + lastName + SPACE
					+ StringUtils.trimToEmpty(employeeDetails.getMiddleName()));

		} else {
			return Stream
					.of(StringUtils.trimToEmpty(employeeDetails.getLastName()),
							StringUtils.trimToEmpty(employeeDetails.getFirstName()))
					.filter(employee -> employee != null && !employee.isEmpty())
					.collect(Collectors.joining(COMMA_SPACE)) + SPACE
					+ StringUtils.trimToEmpty(employeeDetails.getMiddleName());
		}
	}

	/**
	 * method used for assigning privileges to users
	 * 
	 * @param applicationUserEntity
	 * @return
	 */
	private List<String> userPrivilagesData(final ApplicationUserEntity applicationUserEntity) {
		List<String> privilagesDataList = stndResourceObjectDao
				.fetchAccessiblePrivilages(applicationUserEntity.getApplicationUserId().toString());
		final List<String> privilagesNewDataList = new ArrayList<>();
		for (final String eachPrivilage : privilagesDataList) {
			String[] eachPrivilages = eachPrivilage.split(SEMI_COLON);
			for (final String eachPrivilageData : eachPrivilages) {
				privilagesNewDataList.add(eachPrivilageData);
			}
		}
		return privilagesNewDataList;
	}

	/**
	 * This method is used to build column details
	 * 
	 * @return
	 */
	private ApplicationUserView buildColumnDetails() {
		final ApplicationUserView applicationUserView = new ApplicationUserView();
		Resource resource;
		resource = ResourcePatternUtils.getResourcePatternResolver(resourceLoader)
				.getResource(ADDRESS + APPLICATION_USER);
		try {
			final List<AdminColumnDefinition> columnDetails = getColumnsDetails(resource.getInputStream());
			applicationUserView.setColumnDetails(columnDetails);

		} catch (final IOException ex) {
			log.error("Error occured while converting JSON to Assignment Columns Object:{}", ex);
		}
		return applicationUserView;
	}

	/**
	 * This method get all the column definitions from the json file
	 * 
	 * @param inputStream
	 * @return
	 */
	private static List<AdminColumnDefinition> getColumnsDetails(final InputStream inputStream) {

		final List<AdminColumnDefinition> jsonList = new ArrayList<>();

		try {
			final Iterator<JsonNode> elements = fetchNodeElements(inputStream);
			while (elements.hasNext()) {
				final JsonNode details = elements.next();
				final AdminColumnDefinition newJsonNode = new ObjectMapper().treeToValue(details,
						AdminColumnDefinition.class);
				jsonList.add(newJsonNode);
			}
		} catch (final IOException ex) {
			log.error("Error occured while reading JSON to list string  in getColumnsDetails method:{}", ex);
		}

		return jsonList;
	}

}
