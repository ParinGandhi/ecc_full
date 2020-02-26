package gov.uspto.patent.ptab.dao;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.math.NumberUtils;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import lombok.extern.slf4j.Slf4j;

/**
 * DAO Implementation for ApplicationUser
 *
 * @author 2020 development team
 *
 */
@Repository
@Slf4j
@SuppressWarnings({ "unchecked", "rawtypes" })
public class ApplicationUserDao {

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
	 * This method is used to fetch details of assignees from the database
	 *
	 * @param role - input role
	 * @return
	 *//*
		 * public List<EmployeeDetails> fetchAssigneesForRole(final String role) {
		 * log.info("Dao call for fetchAssigneesForRole method"); final Query qry =
		 * currentSession().getNamedQuery("getAppealAssigneesForRole");
		 * qry.setParameter("userRole", role); return
		 * qry.setResultTransformer(Transformers.aliasToBean(EmployeeDetails.class)).
		 * list(); }
		 */

	/**
	 * This method is used to validate user id
	 *
	 * @param beNo - unique beno to be validated
	 * @return
	 */
	public BigDecimal validUserId(final String beNo) {
		log.info("Dao call for validUserId method");
		final Query query = currentSession().getNamedQuery("validUserId");
		query.setParameter("applicationUserId", beNo);
		return (BigDecimal) query.uniqueResult();
	}

	/**
	 * This method is used to fetch application user name
	 *
	 * @param applUserId - unique input userid
	 * @return
	 */
	public String fetchApplUserName(final String applUserId) {
		log.info("Dao call for fetchApplUserName method");
		final Query query = currentSession().getNamedQuery("fetchApplUserName");
		query.setParameter(USER_ID, NumberUtils.createBigDecimal(applUserId));
		return (String) query.uniqueResult();
	}

	/**
	 * This method returns true if the input user id is valid
	 *
	 * @param userId - User Identifier performing changes
	 * @return
	 */
	public String userIdValid(final String userId) {
		log.info("Dao call for userIdValid method: userId:{}", userId);
		final Query query = currentSession().getNamedQuery("getUserCountByUserId");
		query.setParameter(USER_ID, StringUtils.trim(userId));
		final Object workerNoReturn = query.uniqueResult();
		log.info("userId:{}; workerNoReturn:{}", userId, workerNoReturn);
		return null != workerNoReturn ? workerNoReturn.toString() : null;
	}

	/**
	 * This method is used to fetch employee details from the database
	 *
	 * @param employeeNumber - unique input employeeNumber
	 * @return
	 */
	public List<String[]> fetchAssigneeInformation(final String employeeNumber) {
		log.info("Dao call for fetchAssigneeInformation method");
		final Query qry = currentSession().getNamedQuery("getAppealAssigneeAndRoleForEmployeeNumber");
		qry.setParameter("employeeNumber", employeeNumber);
		return qry.list();
	}

	/* *//**
			 * This method is used to fetch details of assignees from the database
			 *
			 * @param employeeNumber -unique input employeeNumber
			 * @return
			 */
	/*
	 * public List<EmployeeDetails> fetchAssigneeDataInformation(final String
	 * employeeNumber) {
	 * log.info("Dao call for fetchAssigneeDataInformation method"); final Query qry
	 * =
	 * currentSession().getNamedQuery("getAppealAssigneeAndRoleForEmployeeNumber");
	 * qry.setParameter("employeeNumber", employeeNumber); return
	 * qry.setResultTransformer(Transformers.aliasToBean(EmployeeDetails.class)).
	 * list(); }
	 * 
	 *//**
		 * This method is used to fetch details of assignees from the database
		 *
		 * @param applIdList - unique employee list
		 * @return
		 */
	/*
	 * public List<EmployeeDetails> fetchAssigneeInfoForListOfIds(final List<String>
	 * applIdList) { log.info("Dao call for fetchAssigneeInfoForListOfIds method");
	 * final Query qry =
	 * currentSession().getNamedQuery("fetchAssigneeInfoForListOfIds");
	 * qry.setParameterList("applicationUseridList", applIdList); return
	 * qry.setResultTransformer(Transformers.aliasToBean(EmployeeDetails.class)).
	 * list(); }
	 * 
	 *//**
		 * This method is used to fetch details of assignees from the database
		 *
		 * @param data - input identifier
		 * @return
		 */
	/*
	 * public List<EmployeeDetails> fetchUserPrivileges(final String data) {
	 * log.info("Dao call for fetchUserPrivileges method"); final Query qry =
	 * currentSession().getNamedQuery("getAssigneesForUserPrivileges");
	 * qry.setParameter("identifier", data); return
	 * qry.setResultTransformer(Transformers.aliasToBean(EmployeeDetails.class)).
	 * list(); }
	 * 
	 *//**
		 * This method is used to fetch numbers with names
		 * 
		 * @param firstNm - input first name
		 * @param lastNm  - input last name
		 * @return
		 *//*
			 * public List<ApplicationUserEntity> getApplicationUserIds(final String
			 * firstNm, final String lastNm) { final Query query =
			 * currentSession().getNamedQuery("getApplicationUserIds");
			 * query.setParameter("first_nm", StringUtils.trim(firstNm));
			 * query.setParameter("LAST_NM", StringUtils.trim(lastNm)); return
			 * query.setResultTransformer(Transformers.aliasToBean(ApplicationUserEntity.
			 * class)).list(); }
			 */

	/**
	 * This method is used to retrieve disciplines for APJ
	 * 
	 * @param firstNm - input first name
	 * @return
	 */
	public String getDiscipline(final String judgeIdentifier) {
		final Query query = currentSession().getNamedQuery("getAppealDisciplines");
		query.setParameter("judgeIdentifier", judgeIdentifier);
		return (String) query.uniqueResult();
	}

	/**
	 * This method is used to fetch Judge Employee Numbers from the database
	 *
	 * @param roleId - unique input roleId
	 * @return
	 */
	public Set<String> fetchEmployeeNumbers(final String roleid) {
		log.info("Dao call for fetchEmployeeNumbers method");
		final Query query = currentSession().getNamedQuery("judgesData");
		query.setParameter("roleid", NumberUtils.createInteger(roleid));
		final List<String> listData = query.list();
		return new HashSet<>(listData);
	}

	/**
	 * This method is used to retrieve RoleDescription
	 * 
	 * @param applicationUserId - input applicationUserId
	 * @return
	 */
	public String getRoleDescription(final String applicationUserId) {
		log.info("Dao call for getRoleDescription method");
		final Query query = currentSession().getNamedQuery("getRoleDiscription");
		query.setParameter("applicationUserId", applicationUserId);
		return (String) query.uniqueResult();
	}

	/**
	 * This method is used to validate user id
	 *
	 * @param userId - unique userId to be validated
	 * @return
	 */
	@Transactional(readOnly = true)
	public String getValidUserRole(final String userId) {
		log.info("Dao call for getValidUserRole method");
		final Query query = currentSession().getNamedQuery("getValiedUserRole");
		query.setParameter(USER_ID, userId);
		return (String) query.uniqueResult();
	}

	/**
	 * This method is used to validate user id
	 *
	 * @param userId - unique userId to be validated
	 * @return
	 */
	@Transactional(readOnly = true)
	public List<String> getConfigurredResourceObjectsByUserId(final String userId) {
		log.info("Dao call for getValidUserRole method");
		final Query query = currentSession().getNamedQuery("getConfigurredResourceObjectsByUserId");
		query.setParameter(USER_ID, userId);
		return query.list();
	}

	/**
	 * This method is used to get user to edit due date
	 *
	 * @param userId - unique userId to be validated
	 * @return
	 */
	@Transactional(readOnly = true)
	public List<String> getDueDateAccessByUserId(final String userId) {
		log.info("Dao call for getDueDateAccessByUserId method");
		final Query query = currentSession().getNamedQuery("getDueDateAccessByUserId");
		query.setParameter(USER_ID, userId);
		return query.list();
	}

	/**
	 * This method is used to get user to have login modal
	 *
	 * @param userId - unique userId to be validated
	 * @return
	 */
	@Transactional(readOnly = true)
	public List<String> getLoginModalAccessByUserId(final String userId) {
		log.info("Dao call for getLoginModalAccessByUserId method");
		final Query query = currentSession().getNamedQuery("getLoginModalAccessByUserId");
		query.setParameter(USER_ID, userId);
		return query.list();
	}

	@Transactional(readOnly = true)
	public List<String> test() {
		log.info("Dao call for getLoginModalAccessByUserId method");
		final Query query = currentSession().getNamedQuery("testCodeReference");
		// query.setParameter(USER_ID, userId);
		return query.list();
	}

}