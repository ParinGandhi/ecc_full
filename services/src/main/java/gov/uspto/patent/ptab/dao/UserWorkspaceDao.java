package gov.uspto.patent.ptab.dao;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.math.NumberUtils;
import org.hibernate.query.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.transform.AliasToEntityMapResultTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import gov.uspto.patent.ptab.domain.UserWorkspace;
import lombok.extern.slf4j.Slf4j;

/**
 * DAO Implementation for UserWorkspace
 * 
 * @author 2020 development team
 *
 */
@Slf4j
@Repository
@SuppressWarnings({ "unchecked", "rawtypes" })
public class UserWorkspaceDao {

	private static final String GET_LOCK_CONTROL_NUMBER = "getLockControlNumber";
	private static final String ORDER_SEQUENCE_NUMBER = "orderSequenceNumber";
	private static final String WORKSPACE_ORDER = "order";
	private static final char IS_NOT_DEFAULT = 'N';
	private static final char IS_DEFAULT = 'Y';
	private static final String WORKSPACE_ID = "workspaceId";
	private static final String WORKSPACE_LAYOUT = "layout";
	private static final String WORKSPACE_NAME = "workspaceName";
	private static final String USER_ID = "userId";
	private static final String OLD_ORDER_NO = "oldOrderNo";
	private static final String NEW_ORDER_NO = "newOrderNo";
	private static final String ORDER_NO = "orderNo";
	private static final String DEFAULT_INDICATOR = "defaultIndicator";

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
	 * This method is used to delete the workspace based on the workspace ID
	 * 
	 * @param workspaceId - The workspace identifier
	 * @return
	 */
	public int deleteWorkspace(final String workspaceId) {
		log.info("Dao call for deleteWorkspace method");
		final Query query = currentSession().getNamedQuery("deleteWorkspaceById");
		query.setParameter(WORKSPACE_ID, NumberUtils.createBigDecimal(workspaceId));
		return query.executeUpdate();
	}

	/**
	 * This method is used to update the workspace position only
	 * 
	 * @param workspace - Workspace details to be updated
	 * @return
	 */
	public int updateWorkspacePosition(final UserWorkspace workspace) {
		final BigInteger lockControlNumber = retrieveLockControlNumber(workspace);

		log.info("Dao call for updateWorkspacePosition method");
		final Query query = currentSession().getNamedQuery("updateWorkspacePosition");
		query.setParameter(USER_ID, NumberUtils
				.createBigDecimal(StringUtils.trim(workspace.getAuditData().getLastModifiedUserIdentifier())));
		query.setParameter(WORKSPACE_LAYOUT, workspace.getStructure());
		query.setParameter(WORKSPACE_NAME, workspace.getUserWorkspaceName());
		query.setParameter(WORKSPACE_ID, BigInteger.valueOf(workspace.getUserWorkspaceIdentifier()));
		query.setParameter("lockControlNumber", lockControlNumber);
		return query.executeUpdate();
	}

	/**
	 * This method is used to update the workspace orders
	 * 
	 * @param workspace - Workspace details to be updated
	 * @return
	 */
	public int updateWorkspaceOrders(final UserWorkspace workspace) {

		final BigInteger lockControlNumber = retrieveLockControlNumber(workspace);

		log.info("Dao call for updateWorkspaceOrders method");
		final int oldOrder = workspace.getCurrentWorkspaceOrderNumber();
		final int newOrder = workspace.getNewWorkspaceOrderNumber();
		final Query query = currentSession()
				.getNamedQuery(newOrder > oldOrder ? "decrementWorkspaceOrders" : "incrementWorkspaceOrders");
		query.setParameter(NEW_ORDER_NO, BigDecimal.valueOf(newOrder));
		query.setParameter(OLD_ORDER_NO, BigDecimal.valueOf(oldOrder));
		query.setParameter(USER_ID, NumberUtils
				.createBigDecimal(StringUtils.trim(workspace.getAuditData().getLastModifiedUserIdentifier())));
		query.setParameter("lockControlNumber", lockControlNumber);
		return query.executeUpdate();
	}

	/**
	 * This method returns the count of workspaces for a given user
	 * 
	 * @param userId - User Identifier
	 * @return
	 */
	public int countOfWorkspaces(final String userId) {
		log.info("Dao call for countOfWorkspaces method");
		final Query query = currentSession().getNamedQuery("fetchNoOfWorkspacesForAUserId");
		query.setParameter(USER_ID, NumberUtils.createBigDecimal(userId));
		final BigInteger count = (BigInteger) query.uniqueResult();
		return count.intValue();
	}

	/**
	 * This method fetches workspaces for this workspace id
	 * 
	 * @param workspaceId - The current workspace id
	 * @return
	 */
	public List<Map<String, Object>> fetchAllWorkspacesForThisUser(final String workspaceId) {
		log.info("Dao call for fetchAllWorkspacesForThisUser method");
		final Query query = currentSession().getNamedQuery("fetchAllWorkspacesForThisUser");
		query.setParameter(WORKSPACE_ID, NumberUtils.createBigDecimal(workspaceId));
		return query.setResultTransformer(AliasToEntityMapResultTransformer.INSTANCE).list();
	}

	/**
	 * This method is used to make the input workspace default
	 * 
	 * @param workspaceId - Workspace identifier to be defaulted
	 * @return
	 */
	public int makeThisWorkspaceDefault(final Integer workspaceId) {
		final Query lockControlQuery = currentSession().getNamedQuery(GET_LOCK_CONTROL_NUMBER);
		lockControlQuery.setParameter(WORKSPACE_ID, workspaceId);
		final BigInteger lockControlNumber = (BigInteger) lockControlQuery.uniqueResult();

		log.info("Dao call for makeThisWorkspaceDefault method");
		final Query query = currentSession().getNamedQuery("updateDefaultIndicatorsToYForWorkspacesId");
		query.setParameter(WORKSPACE_ID, workspaceId);
		query.setParameter("lockControlNumber", lockControlNumber);
		return query.executeUpdate();
	}

	/**
	 * This method is used to update the workspace orders for the input workspace id
	 * with the input order number
	 * 
	 * @param workspaceId - Workspace identifier
	 * @param orderNo     - Order number to be updated
	 * @return
	 */
	public int updateWorkspaceOrders(final Integer workspaceId, final BigInteger orderNo) {
		final Query lockControlQuery = currentSession().getNamedQuery(GET_LOCK_CONTROL_NUMBER);
		lockControlQuery.setParameter(WORKSPACE_ID, workspaceId);
		final BigInteger lockControlNumber = (BigInteger) lockControlQuery.uniqueResult();

		log.info("Dao call for updateWorkspaceOrders method");
		final Query query = currentSession().getNamedQuery("updateWorkspaceOrders");
		query.setParameter(WORKSPACE_ID, workspaceId);
		query.setParameter(ORDER_NO, orderNo);
		query.setParameter("lockControlNumber", lockControlNumber);
		return query.executeUpdate();
	}

	/**
	 * This method is used to update the workspace orders
	 * 
	 * @param workspace - Workspace details to be updated
	 * @param userId    - User id who is modifying the orders
	 * @return
	 */
	public int updateWorkspaceOrderOnly(final UserWorkspace workspace, final String userId) {
		log.info("Dao call for updateWorkspaceOrderOnly method");

		final Query lockControlQuery = currentSession().getNamedQuery(GET_LOCK_CONTROL_NUMBER);
		lockControlQuery.setParameter(WORKSPACE_ID, workspace.getUserWorkspaceIdentifier());
		final BigInteger lockControlNumber = (BigInteger) lockControlQuery.uniqueResult();

		final Query query = currentSession().getNamedQuery("updateWorkspaceOrderOnly");
		query.setParameter(NEW_ORDER_NO, BigDecimal.valueOf(workspace.getCurrentWorkspaceOrderNumber()));
		query.setParameter(WORKSPACE_ID, BigDecimal.valueOf(workspace.getUserWorkspaceIdentifier()));
		query.setParameter(USER_ID, NumberUtils.createBigDecimal(userId));
		query.setParameter("lockControlNumber", lockControlNumber);
		return query.executeUpdate();
	}

	/**
	 * This method returns true if the input user id is valid
	 * 
	 * @param userId - User Identifier performing changes
	 * @return
	 */
	public int addWorkspace(final UserWorkspace workspace) {
		log.info("Dao call for addWorkspace method");

		final BigInteger orderSequenceNumber = retrieveOrderSequenceNumber(workspace);

		final Query query = currentSession().getNamedQuery("createWorkspace");
		query.setParameter(USER_ID, NumberUtils
				.createBigDecimal(StringUtils.trim(workspace.getAuditData().getLastModifiedUserIdentifier())));
		query.setParameter(WORKSPACE_NAME, workspace.getUserWorkspaceName());
		query.setParameter(DEFAULT_INDICATOR, workspace.isDefaultIndicator() ? IS_DEFAULT : IS_NOT_DEFAULT);
		query.setParameter(WORKSPACE_LAYOUT, workspace.getStructure());
		query.setParameter(ORDER_SEQUENCE_NUMBER, orderSequenceNumber);
		return query.executeUpdate();
	}

	/**
	 * This method retrieves order sequence number for user.
	 */
	private BigInteger retrieveOrderSequenceNumber(final UserWorkspace workspace) {

		final Query query = currentSession().getNamedQuery("getNextOrderSequenceNumberForWorkspace");
		query.setParameter(USER_ID, NumberUtils
				.createBigDecimal(StringUtils.trim(workspace.getAuditData().getLastModifiedUserIdentifier())));
		return (BigInteger) query.uniqueResult();
	}

	/**
	 * This method is used to update the workspace
	 * 
	 * @param workspace - Workspace details to be updated
	 * @return
	 */
	public int updateWorkspace(final UserWorkspace workspace) {

		final BigInteger lockControlNumber = retrieveLockControlNumber(workspace);

		log.info("Dao call for updateWorkspace method");
		final Query query = currentSession().getNamedQuery("updateWorkspace");
		query.setParameter(USER_ID, NumberUtils
				.createBigDecimal(StringUtils.trim(workspace.getAuditData().getLastModifiedUserIdentifier())));
		query.setParameter(WORKSPACE_NAME, workspace.getUserWorkspaceName());
		query.setParameter(DEFAULT_INDICATOR, workspace.isDefaultIndicator() ? IS_DEFAULT : IS_NOT_DEFAULT);
		query.setParameter(WORKSPACE_LAYOUT, workspace.getStructure());
		query.setParameter(WORKSPACE_ORDER,
				BigDecimal
						.valueOf(null != workspace.getNewWorkspaceOrderNumber() ? workspace.getNewWorkspaceOrderNumber()
								: workspace.getCurrentWorkspaceOrderNumber()));
		query.setParameter(WORKSPACE_ID, BigDecimal.valueOf(workspace.getUserWorkspaceIdentifier()));
		query.setParameter("lockControlNumber", lockControlNumber);
		return query.executeUpdate();
	}

	/**
	 * This method is used to update the user's workspace Indicators to N, except
	 * the input workspace id
	 * 
	 * @param workspace - Workspace details to be updated
	 * @return
	 */
	public int makeOtherWorkspacesNonDefault(final UserWorkspace workspace) {

		final BigInteger lockControlNumber = retrieveLockControlNumber(workspace);

		log.info("Dao call for makeOtherWorkspacesNonDefault method");
		final Query query = currentSession().getNamedQuery("updateDefaultIndicatorsToNForWorkspacesOtherThanInputId");
		query.setParameter(USER_ID, NumberUtils
				.createBigDecimal(StringUtils.trim(workspace.getAuditData().getLastModifiedUserIdentifier())));
		query.setParameter(WORKSPACE_ID, BigDecimal.valueOf(workspace.getUserWorkspaceIdentifier()));
		query.setParameter("lockControlNumber", lockControlNumber);
		return query.executeUpdate();
	}

	/**
	 * This method is used to retrieve lock control number.
	 */
	private BigInteger retrieveLockControlNumber(final UserWorkspace workspace) {

		final Query lockControlQuery = currentSession().getNamedQuery(GET_LOCK_CONTROL_NUMBER);
		lockControlQuery.setParameter(WORKSPACE_ID, workspace.getUserWorkspaceIdentifier());
		final BigInteger lockControlNumber = (BigInteger) lockControlQuery.uniqueResult();
		return lockControlNumber;
	}

}