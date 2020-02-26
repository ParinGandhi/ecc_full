package gov.uspto.patent.ptab.dao;

import static gov.uspto.patent.ptab.utils.PTABConstants.ZERO;
import static gov.uspto.patent.ptab.utils.PTABServiceUtils.convertObjectToString;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.math.NumberUtils;
import org.hibernate.query.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.transform.AliasToEntityMapResultTransformer;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import gov.uspto.patent.ptab.domain.UserWorkspaceWidget;
import gov.uspto.patent.ptab.domain.named.query.UserWorkspaceAndWidgetDetail;
import gov.uspto.patent.ptab.entities.CodeReferenceEntity;
import gov.uspto.patent.ptab.repository.CodeReferenceRepository;
import lombok.extern.slf4j.Slf4j;

/**
 * DAO Implementation for UserWorkspaceWidget
 *
 * @author 2020 development team
 *
 */
@Slf4j
@Repository
@SuppressWarnings({ "unchecked", "rawtypes" })
public class UserWorkspaceWidgetDao {

	private static final String HEIGHT_STR_INT_MAP = "HEIGHT_STR_INT_MAP";
	private static final String DATA_URL = "dataUrl";
	private static final String COLOR = "color";
	private static final String CONFIG_TEXT = "configText";
	private static final String HEIGHT = "height";
	private static final String WIDGET_NAME = "widgetName";
	private static final String WORKSPACE_WIDGET_ID = "workspaceWidgetId";
	private static final String WIDGET_POSITION = "position";
	private static final String USER_ID = "userId";
	private static final String SELECTED_COLUMNS_DETAILS = "selectedColumnsDetails";
	private static final String WORKSPACE_ID = "workspaceId";
	private static final String WIDGET_ID = "widgetId";
	private static final String GENERIC_ID_THIRD_KEY = "genericIdThirdKey";
	private static final String GENERIC_ID_SECOND_KEY = "genericIdSecondKey";
	private static final String GENERIC_ID_KEY = "genericIdKey";

	@Autowired
	private SessionFactory sessionFactory;

	@Autowired
	private CodeReferenceRepository codeReferenceRepository;

	/**
	 * Initializing the session factory which will be used for all transactions
	 * within business layer
	 */
	private Session currentSession() {
		return sessionFactory.getCurrentSession();

	}

	/**
	 * This method deletes a widget based on its ID
	 *
	 * @param widgetId - Widget identifier
	 * @return
	 */
	public int deleteWidget(final String widgetId) {
		log.info("Dao call for deleteWidget method");
		final Query query = currentSession().getNamedQuery("deleteWidgetById");
		query.setParameter(WIDGET_ID, NumberUtils.createBigDecimal(widgetId));
		return query.executeUpdate();
	}

	/**
	 * This method deletes all the widgets associated to a workspace based on the
	 * workspace ID
	 *
	 * @param workspaceId - The workspace identifier
	 * @return
	 */
	public int deleteWidgetByWorkspaceId(final String workspaceId) {
		log.info("Dao call for deleteWorkspace method");
		final Query query = currentSession().getNamedQuery("deleteAllWidgetsOfAWorkspace");
		query.setParameter(WORKSPACE_ID, NumberUtils.createBigInteger(workspaceId));
		return query.executeUpdate();
	}

	/**
	 * This method is used to update the selected columns data for the input widget
	 * id with the input selected columns as JSON
	 *
	 * @param widgetId                 - The uniquer widget identifier
	 * @param selectedColumnsAsJsonStr - Selected columns data as JSON
	 * @return
	 */
	@Transactional
	public int updateSelectedColumnsForAWidget(final BigDecimal widgetId, final String selectedColumnsAsJsonStr) {
		log.info("Dao call for updateSelectedColmuns method");
		final Query query = currentSession().getNamedQuery("updateSelectedColumnsListForAWidget");
		query.setParameter(SELECTED_COLUMNS_DETAILS, selectedColumnsAsJsonStr);
		query.setParameter(WIDGET_ID, widgetId);
		return query.executeUpdate();
	}

	/**
	 * This method is used to fetch the selected columns and the widget name for the
	 * input widget id
	 *
	 * @param widgetId - Input widget id
	 * @return
	 */
	public Map<String, String> fetchSelectedColumnsDetails(final BigDecimal widgetId) {
		log.info("Dao call for fetchSelectedColmuns method");
		final Query query = currentSession().getNamedQuery("fetchSelectedColumnsDetails");
		query.setParameter(WIDGET_ID, widgetId);
		final Map<String, String> fetchedData = new HashMap<>();
		final List<Map<String, Object>> clobReadTest = query
				.setResultTransformer(AliasToEntityMapResultTransformer.INSTANCE).list();

		for (final Map<String, Object> eachMap : clobReadTest) {
			for (final Map.Entry<String, Object> eachMapEntry : eachMap.entrySet()) {
				fetchedData.put(eachMapEntry.getKey(), convertObjectToString(eachMapEntry.getValue()));
			}
		}
		return fetchedData;
	}

	/**
	 * This method is used to add the WorkspaceWidget
	 *
	 * @param workspaceWidget - WorkspaceWidget details to be added
	 * @param workspaceId     - Workspace identifier
	 * @return
	 */
	public int addWidget(@Valid @NotNull final UserWorkspaceWidget workspaceWidget,
			@Valid @NotNull final Integer workspaceId) {

		final CodeReferenceEntity codeReferenceEntity = codeReferenceRepository.findByTypeCdAndDescriptionTx(
				HEIGHT_STR_INT_MAP, StringUtils.trim(workspaceWidget.getWidgetHeightPixelQuality()));

		log.info("Dao call for createWidgetHelper method");
		final Query query = currentSession().getNamedQuery("createWidget");
		query.setParameter(WORKSPACE_WIDGET_ID, new BigDecimal(workspaceWidget.getUserWorkspaceWidgetIdentifier()));
		query.setParameter(USER_ID, NumberUtils
				.createBigDecimal(StringUtils.trim(workspaceWidget.getAuditData().getLastModifiedUserIdentifier())));
		query.setParameter(WORKSPACE_ID, BigDecimal.valueOf(workspaceId));
		query.setParameter(WIDGET_ID, BigDecimal.valueOf(workspaceWidget.getWidgetData().getWidgetIdentifier()));
		query.setParameter(WIDGET_NAME, workspaceWidget.getWidgetCustomName());
		query.setParameter(WIDGET_POSITION, StringUtils.trim(workspaceWidget.getWidgetPositionText()));
		query.setParameter(CONFIG_TEXT, workspaceWidget.getConfigText());
		query.setParameter(HEIGHT,
				null != codeReferenceEntity && StringUtils.isNotBlank(codeReferenceEntity.getValueTx())
						? StringUtils.trim(codeReferenceEntity.getValueTx())
						: null);
		query.setParameter(COLOR, StringUtils.trim(workspaceWidget.getWidgetColor()));
		query.setParameter(DATA_URL, workspaceWidget.getDataUrlText());
		query.setParameter(SELECTED_COLUMNS_DETAILS, workspaceWidget.getSelectedColumnsAsStr());

		return query.executeUpdate();
	}

	/**
	 * This method is used to update a widget details
	 *
	 * @param workspaceWidget - Widget Details to be updated
	 * @return
	 */
	public int updateWidget(final UserWorkspaceWidget workspaceWidget) {

		final CodeReferenceEntity codeReferenceEntity = codeReferenceRepository.findByTypeCdAndDescriptionTx(
				HEIGHT_STR_INT_MAP, StringUtils.trim(workspaceWidget.getWidgetHeightPixelQuality()));

		final BigInteger lockControlNumber = retrieveLockControlNumber(workspaceWidget);

		log.info("Dao call for updateWidget method");
		final Query query = currentSession().getNamedQuery("updateWidget");
		query.setParameter(USER_ID, NumberUtils
				.createBigDecimal(StringUtils.trim(workspaceWidget.getAuditData().getLastModifiedUserIdentifier())));
		query.setParameter(WIDGET_ID, workspaceWidget.getUserWorkspaceWidgetIdentifier());
		query.setParameter(WIDGET_NAME, workspaceWidget.getWidgetCustomName());
		query.setParameter(WIDGET_POSITION, StringUtils.trim(workspaceWidget.getWidgetPositionText()));
		query.setParameter("heightPixelQt",
				null != codeReferenceEntity && StringUtils.isNotBlank(codeReferenceEntity.getValueTx())
						? StringUtils.trim(codeReferenceEntity.getValueTx())
						: null);
		query.setParameter(CONFIG_TEXT, workspaceWidget.getConfigText());
		query.setParameter(COLOR, StringUtils.trim(workspaceWidget.getWidgetColor()));
		query.setParameter("lockControlNumber", lockControlNumber);
		return query.executeUpdate();
	}

	/**
	 * This method fetches the next sequence value for adding widget
	 *
	 * @return
	 */
	public Integer getNextSeqValForWidget() {
		log.info("Dao call for createWidgetHelper method");
		final BigInteger workspaceWidgetId = (BigInteger) currentSession().getNamedQuery("getNextSeqForWidget")
				.uniqueResult();
		return workspaceWidgetId.intValue();

	}

	/**
	 * This method is used to update a widget position
	 *
	 * @param workspaceWidget - Widget position Details to be updated
	 * @return
	 */
	public int updateWidgetPosition(final UserWorkspaceWidget workspaceWidget) {
		log.info("Dao call for updateWidgetsPositionByZones method");
		final boolean updateLastModUser = null != workspaceWidget.getAuditData()
				&& StringUtils.isNotBlank(workspaceWidget.getAuditData().getLastModifiedUserIdentifier());
		final String queryName = updateLastModUser ? "updateWidgetPosition" : "updateWidgetPositionOnly";

		final Query lockControlQuery = currentSession().getNamedQuery("retrieveControlNumber");
		lockControlQuery.setParameter(WIDGET_ID,
				BigDecimal.valueOf(workspaceWidget.getUserWorkspaceWidgetIdentifier()));
		final BigInteger lockControlNumber = (BigInteger) lockControlQuery.uniqueResult();

		final Query query = currentSession().getNamedQuery(queryName);
		if (updateLastModUser) {
			query.setParameter(USER_ID, NumberUtils.createBigDecimal(
					StringUtils.trim(workspaceWidget.getAuditData().getLastModifiedUserIdentifier())));
		}
		query.setParameter(WIDGET_POSITION, StringUtils.trim(workspaceWidget.getWidgetPositionText()));
		query.setParameter("lockControlNumber", lockControlNumber);
		query.setParameter(WIDGET_ID, BigDecimal.valueOf(workspaceWidget.getUserWorkspaceWidgetIdentifier()));
		return query.executeUpdate();
	}

	/**
	 * This method is used to update a widget position
	 *
	 * @param widgetId      - Unique identifier of the widget
	 * @param position      - New position text to be updated
	 * @param lastModUserId - Last mod user identifier
	 * @return
	 */
	public int updateWidgetPosition(final BigDecimal widgetId, final String position, final String lastModUserId) {
		log.info("Dao call for changeWorkspaceLayout method");
		final Query query = currentSession().getNamedQuery("updateWidgetPosition");
		query.setParameter(USER_ID, NumberUtils.createBigDecimal(lastModUserId));
		query.setParameter(WIDGET_ID, widgetId);
		query.setParameter(WIDGET_POSITION, position);

		return query.executeUpdate();
	}

	/**
	 * This method fetches widgets for the workspace of the input widget id
	 *
	 * @param widgetId - The current widget id
	 * @return
	 */
	public List<UserWorkspaceAndWidgetDetail> fetchAllWidgetsForInputWidgetsWorkspace(final Integer widgetId) {
		log.info("Dao call for deleteWidget method");
		final Query query = currentSession().getNamedQuery("fetchAllWidgetsForTheWorkspaceOfTheInputWidgetId");
		query.setParameter(WIDGET_ID, BigDecimal.valueOf(widgetId));
		return query.setResultTransformer(Transformers.aliasToBean(UserWorkspaceAndWidgetDetail.class)).list();
	}

	/**
	 * This method fetches the User Workspace And Widget Details by widget id
	 *
	 * @param widgetId        - Unique widget identifier
	 * @param destWorkspaceId - Unique WorkspaceId
	 * @return
	 */
	public UserWorkspaceAndWidgetDetail fetchWidgetDetailsByWidgetId(final Integer widgetId,
			final Integer destWorkspaceId) {
		log.info("Dao call for copyWidget method");
		final Query query = currentSession().getNamedQuery("getWidgetDetailsForWidgetId");
		query.setParameter(WORKSPACE_WIDGET_ID, BigDecimal.valueOf(widgetId));
		query.setParameter(WORKSPACE_ID, BigDecimal.valueOf(destWorkspaceId));
		final List<UserWorkspaceAndWidgetDetail> widgetDetailsList = query
				.setResultTransformer(Transformers.aliasToBean(UserWorkspaceAndWidgetDetail.class)).list();
		return CollectionUtils.isNotEmpty(widgetDetailsList) ? widgetDetailsList.get(ZERO) : null;
	}

	/**
	 * This method check if something exists
	 *
	 * @param key       - first key
	 * @param secondKey - second key(optional)
	 * @param thirdKey  - third key(optional)
	 * @return
	 */
	@Transactional
	public boolean checkIfExistsGeneric(final Object key, final Object secondKey, final Object thirdKey,
			final String queryName) {
		log.info("Dao call for updateSelectedColmuns method");
		final Query query = currentSession().getNamedQuery(queryName) // "checkIfWorkspaceNameExists"
																		// "checkIfWorkspaceExists"
		;
		query.setParameter(GENERIC_ID_KEY, key);
		if (null != secondKey) {
			query.setParameter(GENERIC_ID_SECOND_KEY, secondKey);
		}
		if (null != thirdKey) {
			query.setParameter(GENERIC_ID_THIRD_KEY, thirdKey);
		}
		final Object result = query.uniqueResult();
		return null != result;
	}

	/**
	 * This method fetches the User Workspace And Widget Details by widget id
	 *
	 * @param widgetId        - Unique widget identifier
	 * @param destWorkspaceId - Unique WorkspaceId
	 * @return
	 */
	public Object getSelectedColumnListDocForWorkspaceWidgetId(final Integer workSpaceWidgetIdentifier) {
		log.info("Dao call for getSelectedColumnListDocForWorkspaceWidgetId method");
		final Query query = currentSession().getNamedQuery("getSelectedColumnListDocForWorkspaceWidgetId");
		query.setParameter(WORKSPACE_WIDGET_ID, BigDecimal.valueOf(workSpaceWidgetIdentifier));

		return query.uniqueResult();
	}

	/**
	 * method to update the selected columns doc
	 * 
	 * @param workSpaceWidgetIdentifier
	 * @param destWidgetIdentifier
	 * @return
	 */
	public int updateColumnListDocForWorkspaceWidgetId(final Integer workSpaceWidgetIdentifier,
			final Integer destWidgetIdentifier) {
		log.info("Dao call for updateColumnListDocForWorkspaceWidgetId method");
		final Query query = currentSession().getNamedQuery("updateColumnListDocForWorkspaceWidgetId");
		query.setParameter("sourceWidgetId", BigDecimal.valueOf(workSpaceWidgetIdentifier));
		query.setParameter("destinationWidgetId", BigDecimal.valueOf(destWidgetIdentifier));
		return query.executeUpdate();
	}

	/**
	 * This method is used to retrieve lock control number.
	 */
	private BigInteger retrieveLockControlNumber(final UserWorkspaceWidget workspaceWidget) {

		final Query lockControlQuery = currentSession().getNamedQuery("retrieveControlNumber");
		lockControlQuery.setParameter(WIDGET_ID,
				BigDecimal.valueOf(workspaceWidget.getUserWorkspaceWidgetIdentifier()));
		final BigInteger lockControlNumber = (BigInteger) lockControlQuery.uniqueResult();
		return lockControlNumber;
	}

}