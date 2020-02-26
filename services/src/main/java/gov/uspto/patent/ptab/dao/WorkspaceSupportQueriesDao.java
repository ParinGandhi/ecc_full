package gov.uspto.patent.ptab.dao;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.hibernate.query.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.transform.AliasToEntityMapResultTransformer;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import gov.uspto.patent.ptab.domain.StandardWidgetsEntity;
import gov.uspto.patent.ptab.domain.named.query.UserWorkspaceAndWidgetDetail;
import lombok.extern.slf4j.Slf4j;

/**
 * DAO Implementation for Workspace Support
 * 
 * @author 2020 development team
 *
 */
@Slf4j
@Repository
@SuppressWarnings({ "unchecked", "rawtypes" })
public class WorkspaceSupportQueriesDao {

	private static final String POSITION_LIKE = "positionLike";
	private static final String WIDGET_NAME = "widgetName";
	private static final String WIDGET_ID = "widgetId";
	private static final String WORKSPACE_ID = "workspaceId";
	private static final String USER_ID = "userId";

	@Autowired
	private SessionFactory sessionFactory;

	/**
	 * Initializing the session factory which will be used for all transactions
	 * within business layer
	 */
	private Session currentSession() {
		return sessionFactory.getCurrentSession();

	}

	/**
	 * This method fetches the User Workspace And Widget Details
	 * 
	 * @param workerIdentifier - Application User ID
	 * @return
	 */
	public List<UserWorkspaceAndWidgetDetail> fetchUserWorkspaceAndWidgetDetails(final String userId) {
		log.info("Dao call for fetchUserWorkspaceAndWidgetDetails method");
		final Query query = currentSession().getNamedQuery("getWorkspaceAndWidgetForWorker");
		query.setParameter(USER_ID, userId);

		final List<Object[]> resultList = query.list();
		final List<UserWorkspaceAndWidgetDetail> userWorkspaceAndWidgetDetailList = new ArrayList<>();
		if (CollectionUtils.isNotEmpty(resultList)) {
			for (final Object[] object : resultList) {
				final UserWorkspaceAndWidgetDetail userWorkspaceAndWidgetDetail = new UserWorkspaceAndWidgetDetail();
				userWorkspaceAndWidgetDetail.setFirstName(checkNullAndTrim(object[0]));
				userWorkspaceAndWidgetDetail.setMiddleName(checkNullAndTrim(object[1]));
				userWorkspaceAndWidgetDetail.setLastName(checkNullAndTrim(object[2]));
				userWorkspaceAndWidgetDetail.setEmailAddressText(checkNullAndTrim(object[3]));
				userWorkspaceAndWidgetDetail.setUserType(checkNullAndTrim(object[4]));
				userWorkspaceAndWidgetDetail.setWorkspaceIdentifier(checkNullAndFetchInteger(object[5]));
				userWorkspaceAndWidgetDetail.setWorkspaceName(checkNullAndTrim(object[6]));
				userWorkspaceAndWidgetDetail.setWorkspaceLayout(checkNullAndTrim(object[7]));
				userWorkspaceAndWidgetDetail.setWorkspaceDefaultIndicator(checkNullAndFetchCharacter(object[8]));
				userWorkspaceAndWidgetDetail.setWorkspaceOrder(checkNullAndFetchInteger(object[9]));
				userWorkspaceAndWidgetDetail.setStndWidgetIdentifier(checkNullAndFetchInteger(object[10]));
				userWorkspaceAndWidgetDetail.setWidgetIdentifier(checkNullAndFetchInteger(object[11]));
				userWorkspaceAndWidgetDetail.setWidgetPosition(checkNullAndTrim(object[12]));
				userWorkspaceAndWidgetDetail.setWidgetDescription(checkNullAndTrim(object[13]));
				userWorkspaceAndWidgetDetail.setWidgetCategory(checkNullAndTrim(object[14]));
				userWorkspaceAndWidgetDetail.setWidgetName(checkNullAndTrim(object[15]));
				userWorkspaceAndWidgetDetail.setWidgetConfigurationText(checkNullAndTrim(object[16]));
				userWorkspaceAndWidgetDetail.setWidgetHeight(checkNullAndTrim(object[17]));
				userWorkspaceAndWidgetDetail.setWidgetColor(checkNullAndTrim(object[18]));
				userWorkspaceAndWidgetDetail.setWidgetStndName(checkNullAndTrim(object[19]));
				userWorkspaceAndWidgetDetail.setWorkspaceStructureMapping(checkNullAndTrim(object[20]));
				userWorkspaceAndWidgetDetail.setDataUrlText(checkNullAndTrim(object[21]));
				userWorkspaceAndWidgetDetailList.add(userWorkspaceAndWidgetDetail);
			}

		}
		return userWorkspaceAndWidgetDetailList;
		// return
		// query.setResultTransformer(Transformers.aliasToBean(UserWorkspaceAndWidgetDetail.class)).list();
	}

	public static String checkNullAndTrim(final Object inputStr) {
		return null != inputStr ? StringUtils.trim(String.valueOf(inputStr)) : null;
	}

	public static BigDecimal checkNullAndFetchBigDecimal(final Object inputStr) {
		return null != inputStr ? new BigDecimal(inputStr.toString()) : null;
	}

	public static Integer checkNullAndFetchInteger(final Object inputStr) {
		return null != inputStr ? new Integer(inputStr.toString()) : null;
	}

	public static Character checkNullAndFetchCharacter(final Object inputStr) {
		return null != inputStr ? inputStr.toString().charAt(0) : null;
	}

	/*  *//**
			 * This method returns true if the input user id is valid
			 * 
			 * @param userId - User Identifier performing changes
			 * @return
			 *//*
				 * public Role fetchUserRole(final String applUserId) {
				 * log.info("Dao call for fetchUserRole method"); final Query query =
				 * currentSession().getNamedQuery("fetchUserRoleForApplUserId");
				 * query.setParameter(USER_ID, StringUtils.trim(applUserId)); final List<Role>
				 * roles =
				 * query.setResultTransformer(Transformers.aliasToBean(Role.class)).list();
				 * return CollectionUtils.isEmpty(roles) ? null : roles.get(0); }
				 */

	/**
	 * This method is used to fetch all the available stnd widgets
	 * 
	 * @return
	 */
	public List<StandardWidgetsEntity> fetchStndWidgets() {
		log.info("Dao call for fetchStndWidgets method");
		final Query query = currentSession().getNamedQuery("fetchStndWidgets");
		final List<Object[]> resultList = query.list();
		return query.setResultTransformer(Transformers.aliasToBean(StandardWidgetsEntity.class)).list();
	}

	/**
	 * This method fetches workspace and its containing widgets details for this
	 * workspace id
	 * 
	 * @param workspaceId - The current workspace id
	 * @return
	 */
	public List<UserWorkspaceAndWidgetDetail> getWorkspaceAndWidgetDetailsForWorkspaceId(final Integer workspaceId) {
		log.info("Dao call for getWorkspaceAndWidgetDetailsForWorkspaceId method");
		final Query query = currentSession().getNamedQuery("getWorkspaceAndWidgetDetailsForWorkspaceId");
		query.setParameter(WORKSPACE_ID, BigInteger.valueOf(workspaceId));
		return query.setResultTransformer(Transformers.aliasToBean(UserWorkspaceAndWidgetDetail.class)).list();
	}

	/**
	 * This method fetches workspace and its containing widgets position summary for
	 * this workspace id
	 * 
	 * @param workspaceId - The current workspace id
	 * @param queryName   - Name of the query
	 * @return
	 */
	public List<UserWorkspaceAndWidgetDetail> getWidgetPositionSummaryForWorkspaceId(final Integer workspaceId,
			final String queryName) {
		log.info("Dao call for getWidgetPositionSummaryForWorkspaceId method");
		final Query query = currentSession().getNamedQuery(queryName);
		query.setParameter(WORKSPACE_ID, BigDecimal.valueOf(workspaceId));
		return query.setResultTransformer(Transformers.aliasToBean(UserWorkspaceAndWidgetDetail.class)).list();
	}

	/**
	 * This method fetches workspace and its containing widgets summary for this
	 * workspace id
	 * 
	 * @param workspaceId - The current workspace id
	 * @return
	 */
	public List<UserWorkspaceAndWidgetDetail> getWorkspaceAndWidgetSummaryForWorkspaceId(final Integer workspaceId) {
		log.info("Dao call for getWorkspaceAndWidgetSummaryForWorkspaceId method");
		final Query query = currentSession().getNamedQuery("getWorkspaceAndWidgetSummaryForWorkspaceId");
		query.setParameter(WORKSPACE_ID, BigInteger.valueOf(workspaceId));
		return query.setResultTransformer(Transformers.aliasToBean(UserWorkspaceAndWidgetDetail.class)).list();
	}

	/**
	 * This method fetches widgets for this workspace id
	 * 
	 * @param workspaceId - The current workspace id
	 * @return
	 */
	public List<UserWorkspaceAndWidgetDetail> fetchAllWidgetsForThisWorkspace(final Integer workspaceId) {
		log.info("Dao call for fetchAllWidgetsForThisWorkspace method");
		final Query query = currentSession().getNamedQuery("fetchAllWidgetsForThisWorkspaceId");
		query.setParameter(WORKSPACE_ID, BigDecimal.valueOf(workspaceId));
		return query.setResultTransformer(Transformers.aliasToBean(UserWorkspaceAndWidgetDetail.class)).list();
	}

	/**
	 * This method fetches the next position text for the given workspace id in the
	 * default zone
	 * 
	 * @param workspaceId  - Unique workspace identifier
	 * @param stndWidgetId - Standard widget identifier being added
	 * @param widgetName   - Standard widget name
	 * @param userId       - Unique userId
	 * @return
	 */
	public Map<String, String> fetchConfigForWidgetNameAndPosition(final BigDecimal workspaceId,
			final BigDecimal stndWidgetId, final String widgetName, final BigDecimal userId) {
		log.info("Dao call for fetchConfigForWidgetNameAndPosition method");
		final Query query = currentSession().getNamedQuery("fetchConfigForWidgetNameAndPosition");
		query.setParameter(WORKSPACE_ID, workspaceId);
		query.setParameter(WIDGET_ID, stndWidgetId);
		query.setParameter(WIDGET_NAME, widgetName);
		query.setParameter(USER_ID, userId);
		final List<Map<String, String>> configs = query.setResultTransformer(AliasToEntityMapResultTransformer.INSTANCE)
				.list();
		final Map<String, String> consolidatedConfig = new HashMap<>();
		for (final Map<String, String> eachMap : configs) {
			for (final Map.Entry<String, String> eachMapEntry : eachMap.entrySet()) {
				consolidatedConfig.put(eachMapEntry.getKey(), eachMapEntry.getValue());
			}
		}

		return consolidatedConfig;
	}

	/**
	 * This method fetches the zone configuration
	 * 
	 * @param typeCode     - type code to look for
	 * @param positionLike - Position like to look for
	 * @return
	 */
	public List<Map<String, String>> fetchWidgetZoneAndWorkspaceStructure(final BigDecimal workspaceId,
			final String positionLike) {
		log.info("Dao call for fetchWidgetZoneAndWorkspaceStructure method");
		final Query query = currentSession().getNamedQuery("fetchWidgetZone");
		query.setParameter(POSITION_LIKE, positionLike);
		query.setParameter(WORKSPACE_ID, workspaceId);
		return query.setResultTransformer(AliasToEntityMapResultTransformer.INSTANCE).list();
	}

	/**
	 * This method is used to update the workspace orders
	 *
	 * @param workspace - Workspace details to be updated
	 * @param userId    - User id who is modifying the orders
	 * @return
	 */
	public BigDecimal getUserIdByWidgetid(final String widgetId) {
		log.info("Dao call for getUserIdByWidgetid method");
		final Query query = currentSession().getNamedQuery("getUserIdByWidgetId");
		query.setParameter(WIDGET_ID, widgetId);
		return (BigDecimal) query.uniqueResult();
	}

}