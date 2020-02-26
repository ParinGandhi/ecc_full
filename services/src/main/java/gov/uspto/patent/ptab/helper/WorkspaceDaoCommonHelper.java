package gov.uspto.patent.ptab.helper;

import static gov.uspto.patent.ptab.utils.PTABServiceUtils.convertObjectToString;
import static gov.uspto.patent.ptab.utils.PTABServiceUtils.validateAndThrowExceptionWithMsg;
import static gov.uspto.patent.ptab.utils.PTABServiceUtils.validateConditionAndThrowExceptionStatus;

import java.io.IOException;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.TreeMap;
import java.util.concurrent.ConcurrentHashMap;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.math.NumberUtils;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.NoSuchMessageException;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.validation.annotation.Validated;

import gov.uspto.patent.ptab.dao.ApplicationUserDao;
import gov.uspto.patent.ptab.dao.CodeReferenceDao;
import gov.uspto.patent.ptab.dao.StndResourceObjectDao;
import gov.uspto.patent.ptab.dao.UserWorkspaceDao;
import gov.uspto.patent.ptab.dao.UserWorkspaceWidgetDao;
import gov.uspto.patent.ptab.dao.WorkspaceSupportQueriesDao;
import gov.uspto.patent.ptab.domain.CodeReferenceLookup;
import gov.uspto.patent.ptab.domain.UserWorkspace;
import gov.uspto.patent.ptab.domain.UserWorkspaceAndWidgetsInformation;
import gov.uspto.patent.ptab.domain.UserWorkspaceWidget;
import gov.uspto.patent.ptab.domain.WidgetMetaData;
import gov.uspto.patent.ptab.domain.named.query.UserWorkspaceAndWidgetDetail;

import gov.uspto.patent.ptab.utils.PTABException;
import lombok.extern.slf4j.Slf4j;

/**
 * This is helper class which has the business logic for fetching and managing
 * UserWorkspaces
 *
 * @author 2020 development team
 */
@Component
@Validated
@Slf4j
@PropertySource("classpath:ptab_application_messages.properties")
public class WorkspaceDaoCommonHelper {

	private static final int TWO = 2;
	private static final String STRUCTURE_MAP = "structureMap";
	private static final String STRUCTURE_STR = "structure";
	private static final String ZONE_CONFIG = "zoneConfig";
	private static final String CHECK_IF_WIDGET_NAME_EXISTS = "checkIfWidgetNameExists";
	private static final String COUNT_OF_WIDGETS_TYPE = "countOfWidgetsType";
	private static final String COUNT_OF_WIDGET_NAME = "countOfWidgetName";
	private static final String WIDGET_ID = "widgetId";
	private static final String LOGIN_ID = "loginId";
	private static final String COUNT_OF_WIDGETS_TYPE_FOR_USER = "countOfWidgetsTypeForUser";
	private static final String FAVORITE_WIDGET_ID = "favoriteWidgetId";
	private static final String URI_BEGIN = "uriBegin";
	private static final String DEFAULT_COLOR = "defaultColor";
	private static final String DEFAULT_HEIGHT_TEXT = "defaultHeightText";
	private static final String COUNT_OF_WIDGETS_IN_DEFAULT = "countOfWidgetsInDefault";
	private static final String DEFAULT_ZONE_CONFIG = "defaultZoneConfig";
	private static final int ONE = 1;
	private static final int ZERO = 0;
	private static final String ZONE_POSITION_CONFIG = "zonePositionConfig";
	private static final String LAYOUT_CONFIG = "layoutConfig";
	private static final String HYPHEN = "-";
	private static final String TILDA = "~";
	private static final String USER_ID_INVALID = "user.id.invalid";
	private static final int WIDGET_NM_MAX_LEN_WITH_COUNT_AT_END = 194;
	private static final int TEN = 10;
	public static final String WIDGET_COLUMN_JSON = "widget.column.json.";
	public static final String WIDGET_ALREADY_EXISTS_MSG_BGN = "Widget with name ";
	public static final String NO_WORKSPACE_WITH_ID_MSG_BGN = "No workspace with id ";
	public static final String STR_CONFIG = "_CONFIG";
	public static final String CHECK_IF_WORKSPACE_EXISTS = "checkIfWorkspaceExists";
	public static final double ZERO_POINT_ONE = 0.1;
	public static final String POINT_ZERO_STR = ".0";
	public static final String DEFAULT_INDICATOR = "defaultIndicator";
	public static final String WORKSPACE_IDENTIFIER = "workspaceIdentifier";
	public static final char PIPE_CHAR = '|';
	public static final String EMPTY_STR = " ";
	public static final String NON_BREAKING_SPACE_STR = "&nbsp;";
	public static final String SEPARATOR_DOUBLE_PIPE = "||";
	public static final String KEY_STR = "key";
	public static final String VAL_STR = "val";
	public static final String MSG_END_FOUND_TO_DELETE = " found to delete";
	public static final char DEFAULT_TRUE = 'Y';
	public static final String NO_WRKSPC_WIDGET_DETAILS_FOUND_KEY = "no.wrkspc.widget.details.found";
	public static final String DEFAULT_ZONE_KEY_END = "_DEFAULT_ZONE";

	@Autowired
	private CodeReferenceDao codeReferenceDao;

	@Autowired
	public WorkspaceSupportQueriesDao workspaceSupportQueriesDao;

	@Autowired
	private UserWorkspaceWidgetDao userWorkspaceWidgetDao;

	@Autowired
	private UserWorkspaceDao userWorkspaceDao;

	@Autowired
	private StndResourceObjectDao stndResourceObjectDao;

	@Autowired
	private ApplicationUserDao applicationUserDao;

	/**
	 * This method is used to sort the widgets by the position order.
	 *
	 * @param workspaces - workspace details needed to create a workspace
	 */
	public void sortWidgetsByOrder(final List<UserWorkspace> workspaces) {
		for (final UserWorkspace userWorkspace : workspaces) {
			sortWidgetsByOrderHelper(userWorkspace);
		}
	}

	/**
	 * This method helps the sortWidgetsByOrder() method in sorting
	 *
	 * @param userWorkspace - User workspace details needed to create a workspace
	 */
	public void sortWidgetsByOrderHelper(final UserWorkspace userWorkspace) {
		final Map<String, UserWorkspaceWidget> widgetMapByPositionText = new HashMap<>();
		final List<UserWorkspaceWidget> availableWidgetsUnSorted = userWorkspace.getUserWorkspaceWidgetsData();
		if (CollectionUtils.isNotEmpty(availableWidgetsUnSorted)) {
			for (final UserWorkspaceWidget eachWidget : availableWidgetsUnSorted) {
				if (StringUtils.isNotBlank(eachWidget.getWidgetPositionText())) {
					widgetMapByPositionText.put(StringUtils.trim(eachWidget.getWidgetPositionText()), eachWidget);
				}
			}
			userWorkspace.getUserWorkspaceWidgetsData().clear();
			final List<UserWorkspaceWidget> availableWidgetsSorted = sortWidgetByPositionsText(widgetMapByPositionText);
			userWorkspace.getUserWorkspaceWidgetsData().addAll(availableWidgetsSorted);
		}
	}

	/**
	 * This method helps the sortWidgetsByOrder() method in sorting the widgets by
	 * position text
	 *
	 * @param widgetMapByPositionText - Used to position widgets in a workspace
	 * @return
	 */
	public List<UserWorkspaceWidget> sortWidgetByPositionsText(
			final Map<String, UserWorkspaceWidget> widgetMapByPositionText) {
		final Map<Integer, Map<Integer, List<Integer>>> rowColumnOrderMap = new HashMap<>();
		for (final String eachRowColumnOrder : widgetMapByPositionText.keySet()) {
			final String[] currentRowColumnOrderArray = StringUtils.splitByWholeSeparator(eachRowColumnOrder,
					SEPARATOR_DOUBLE_PIPE);
			final int currentRow = NumberUtils.toInt(currentRowColumnOrderArray[ZERO]);
			final int currentColumn = NumberUtils.toInt(currentRowColumnOrderArray[ONE]);
			final int currentOrder = NumberUtils.toInt(currentRowColumnOrderArray[TWO]);
			if (rowColumnOrderMap.containsKey(currentRow)) {
				if (rowColumnOrderMap.get(currentRow).containsKey(currentColumn)) {
					rowColumnOrderMap.get(currentRow).get(currentColumn).add(currentOrder);
				} else {
					final List<Integer> orderList = new ArrayList<>();
					orderList.add(currentOrder);
					rowColumnOrderMap.get(currentRow).put(currentColumn, orderList);
				}
			} else {
				final Map<Integer, List<Integer>> columnOrderMap = new HashMap<>();
				final List<Integer> orderList = new ArrayList<>();
				orderList.add(currentOrder);
				columnOrderMap.put(currentColumn, orderList);
				rowColumnOrderMap.put(currentRow, columnOrderMap);
			}
		}
		return sortWidgetByPositionsTextHelper(rowColumnOrderMap, widgetMapByPositionText);
	}

	/**
	 * This method helps in sorting the widgets by position texts
	 *
	 * @param rowColumnOrderMap       - Map used to order columns in a workspace
	 * @param widgetMapByPositionText - Used to position widgets in a workspace
	 * @return
	 */
	public List<UserWorkspaceWidget> sortWidgetByPositionsTextHelper(
			final Map<Integer, Map<Integer, List<Integer>>> rowColumnOrderMap,
			final Map<String, UserWorkspaceWidget> widgetMapByPositionText) {
		final List<UserWorkspaceWidget> sortedRowColumnOrderList = new ArrayList<>();
		final Map<Integer, Map<Integer, List<Integer>>> rowColumnOrderMapSorted = new TreeMap<>(rowColumnOrderMap);
		Integer currentSortedRow;
		Integer currentSortedColumn;
		for (final Map.Entry<Integer, Map<Integer, List<Integer>>> eachRowColumnOrderMapEntry : rowColumnOrderMapSorted
				.entrySet()) {
			currentSortedRow = eachRowColumnOrderMapEntry.getKey();
			final Map<Integer, List<Integer>> columnOrderMapSorted = new TreeMap<>(
					eachRowColumnOrderMapEntry.getValue());
			for (final Map.Entry<Integer, List<Integer>> columnOrderMapSortedEntry : columnOrderMapSorted.entrySet()) {
				currentSortedColumn = columnOrderMapSortedEntry.getKey();
				final List<Integer> sortedOrders = columnOrderMapSortedEntry.getValue();
				Collections.sort(sortedOrders);
				for (final Integer eachSortedOrder : sortedOrders) {
					final String eachSortedRowColumnOrder = currentSortedRow + SEPARATOR_DOUBLE_PIPE
							+ currentSortedColumn + SEPARATOR_DOUBLE_PIPE + eachSortedOrder;
					sortedRowColumnOrderList.add(widgetMapByPositionText.get(eachSortedRowColumnOrder));
				}
			}
		}
		return sortedRowColumnOrderList;
	}

	/**
	 * This method is used to add the workspaces count and workspace title length
	 * allowed to be created by the user
	 *
	 * @param returnUserWorkspaceDetail    - Contains minimum and maximum number of
	 *                                     user workspaces allowed
	 * @param eachWorkspaceAndWidgetDetail - Contains details related to workspaces
	 *                                     and widgets
	 */
	public void addWorkspaceLimitationDetails(final UserWorkspaceAndWidgetsInformation returnUserWorkspaceDetail,
			final UserWorkspaceAndWidgetDetail eachWorkspaceAndWidgetDetail) {
		if (StringUtils.isNotBlank(eachWorkspaceAndWidgetDetail.getMaxNoOfWorkspacesAllowed())
				&& null == returnUserWorkspaceDetail.getMaximumNumberOfWorkspacesAllowed()) {
			returnUserWorkspaceDetail.setMaximumNumberOfWorkspacesAllowed(
					NumberUtils.toInt(eachWorkspaceAndWidgetDetail.getMaxNoOfWorkspacesAllowed()));
		}
		if (StringUtils.isNotBlank(eachWorkspaceAndWidgetDetail.getMaxWorkspaceTitleLength())
				&& null == returnUserWorkspaceDetail.getMaximumWorkspaceTitleLengthAllowed()) {
			returnUserWorkspaceDetail.setMaximumWorkspaceTitleLengthAllowed(
					NumberUtils.toInt(eachWorkspaceAndWidgetDetail.getMaxWorkspaceTitleLength()));
		}
	}

	/**
	 * This method is used to check whether a particular workspace exists or not
	 *
	 * @param workspaceMap                 - Contains details related to workspace
	 * @param eachWorkspaceAndWidgetDetail - Contains details related to workspaces
	 *                                     and widgets
	 * @param currentWorkspaceId           - Unique identifier used to identify
	 *                                     current workspace
	 * @return
	 */
	public UserWorkspace checkIfWorkspaceAlreadyExistsAndAddDetails(final Map<Integer, UserWorkspace> workspaceMap,
			final UserWorkspaceAndWidgetDetail eachWorkspaceAndWidgetDetail, final Integer currentWorkspaceId) {
		UserWorkspace eachWorkspace;
		if (workspaceMap.containsKey(currentWorkspaceId)) {
			eachWorkspace = workspaceMap.get(currentWorkspaceId);
		} else {
			eachWorkspace = new UserWorkspace();
			eachWorkspace
					.setDefaultIndicator(DEFAULT_TRUE == eachWorkspaceAndWidgetDetail.getWorkspaceDefaultIndicator());
			eachWorkspace.setUserWorkspaceIdentifier(currentWorkspaceId);
			eachWorkspace.setStructure(eachWorkspaceAndWidgetDetail.getWorkspaceLayout());
			eachWorkspace.setCurrentWorkspaceOrderNumber(eachWorkspaceAndWidgetDetail.getWorkspaceOrder().intValue());
			eachWorkspace.setUserWorkspaceName(StringUtils.replaceAll(eachWorkspaceAndWidgetDetail.getWorkspaceName(),
					EMPTY_STR, NON_BREAKING_SPACE_STR));
		}
		return eachWorkspace;
	}

	/**
	 * This method is used to validate an user
	 *
	 * @param loginId - Unique login identifier
	 * @return
	 */
	public String validateUserId(final String loginId) {
		final String userId = applicationUserDao.userIdValid(loginId);
		validateConditionAndThrowExceptionStatus(StringUtils.isBlank(userId), USER_ID_INVALID, HttpStatus.BAD_REQUEST);
		return userId;
	}

	/**
	 * This method is used to convert the Widget Columns in JSON format to Object
	 *
	 * @param key    - Unique identifier to identify widget columns
	 * @param mapper - Used to convert JSON to Object
	 * @return
	 */
	public WidgetMetaData convertColumnJsonToWidgetColumn(final String key, final ObjectMapper mapper) {
		WidgetMetaData widgetColumnsList = null;
		try {
			final Object clobObj = stndResourceObjectDao.fetchStndResourceObject(key);
			final String value = convertObjectToString(clobObj);

			if (StringUtils.isNotBlank(value)) {

				widgetColumnsList = mapper.readValue(value, WidgetMetaData.class);

			}

		} catch (final NoSuchMessageException | IOException e) {
			log.error("Error occured while converting following JSON to WidgetColumns Object : {}",
					WIDGET_COLUMN_JSON + key, e);
		}
		return widgetColumnsList;
	}

	/**
	 * This method is used to create a map of all the widgets that has to fall back
	 * on the default zone in the new layout
	 *
	 * @param toBeSortedAndReorderedMap - Has details of widgets that are to be
	 *                                  sorted
	 * @param zone                      - Unique number to identify zone
	 * @param positionsList             - Contains positions of all the widgets in a
	 *                                  workspace
	 */
	public void nonExistentZonesMapHelper(final Map<Double, Map<String, UserWorkspaceWidget>> toBeSortedAndReorderedMap,
			final Double zone, final List<String> positionsList) {
		for (final String eachPosition : positionsList) {
			final String[] widgetIdPositionArray = eachPosition.split(TILDA);
			final String widgetId = widgetIdPositionArray[0];
			final String widgetPosition = widgetIdPositionArray[1];
			final UserWorkspaceWidget widget = new UserWorkspaceWidget();
			widget.setUserWorkspaceWidgetIdentifier(NumberUtils.toInt(widgetId));
			if (toBeSortedAndReorderedMap.containsKey(zone)) {
				toBeSortedAndReorderedMap.get(zone).put(widgetPosition, widget);
			} else {
				final Map<String, UserWorkspaceWidget> widgetMapByPositionText = new HashMap<>();
				widgetMapByPositionText.put(widgetPosition, widget);
				toBeSortedAndReorderedMap.put(zone, widgetMapByPositionText);
			}
		}
	}

	/**
	 * This method is used to move the widgets from old layout zones into the
	 * configured zones of the new layout
	 *
	 * @param updatedZoneKeyLikeConfigMap      - Contains details of current zone of
	 *                                         widgets
	 * @param currentZoneNumberAndPositionsMap - Contains details regarding current
	 *                                         zone number and positions of widget
	 * @param updatedZoneNumberAndPositionsMap - Contains details regarding updated
	 *                                         zone number and positions of widget
	 * @param defaultZoneNumber                - Contains default zone number of
	 *                                         widget
	 */
	public void sortThWidgetsIntoNewLayoutsZones(final Map<Integer, String> updatedZoneKeyLikeConfigMap,
			final Map<Integer, List<String>> currentZoneNumberAndPositionsMap,
			final Map<Double, List<String>> updatedZoneNumberAndPositionsMap, final Integer defaultZoneNumber) {
		for (final Map.Entry<Integer, List<String>> widgetsByZoneNo : currentZoneNumberAndPositionsMap.entrySet()) {
			final Integer currentZoneNo = widgetsByZoneNo.getKey();
			final List<String> currentPositions = widgetsByZoneNo.getValue();
			for (final String eachCurrentPosition : currentPositions) {
				final Double zoneKey = updatedZoneKeyLikeConfigMap.containsKey(currentZoneNo)
						? Double.valueOf(currentZoneNo)
						: defaultZoneNumber + ((double) currentZoneNo) / TEN;
				if (updatedZoneNumberAndPositionsMap.containsKey(zoneKey)) {
					updatedZoneNumberAndPositionsMap.get(zoneKey).add(eachCurrentPosition);
				} else {
					final List<String> updatedPositions = new ArrayList<>();
					updatedPositions.add(eachCurrentPosition);
					updatedZoneNumberAndPositionsMap.put(zoneKey, updatedPositions);
				}
			}
		}
	}

	/**
	 * This method is used to map the workspaces to its associated zone numbers in
	 * the current layout
	 *
	 * @param mapByIdentifier                  - Contains details of workspaces to
	 *                                         its associated zone numbers
	 * @param currentZoneNumberAndPositionsMap - Contains details regarding zone
	 *                                         number and positions of widget
	 * @param currentZoneKeyLikeConfigMap      - Contains details of current zone of
	 *                                         widgets
	 */
	public void mapWidgetsOfWorkspacesToZoneNumbers(final Map<Integer, String> mapByIdentifier,
			final Map<Integer, List<String>> currentZoneNumberAndPositionsMap,
			final Map<Integer, String> currentZoneKeyLikeConfigMap) {
		for (final Map.Entry<Integer, String> currentZoneKeyLikeConfigEntry : currentZoneKeyLikeConfigMap.entrySet()) {
			final Integer currentZonePositionNo = currentZoneKeyLikeConfigEntry.getKey();
			final String currentZonePositionLike = currentZoneKeyLikeConfigEntry.getValue().replaceAll(HYPHEN,
					SEPARATOR_DOUBLE_PIPE);
			for (final Map.Entry<Integer, String> mapByIdentifierEntry : mapByIdentifier.entrySet()) {
				final String currentWidgetPosition = mapByIdentifierEntry.getValue();
				final String widgetIdTildaPostionStr = mapByIdentifierEntry.getKey() + TILDA + currentWidgetPosition;
				mapWidgetsOfWorkspacesToZoneNumbersHelper(currentZoneNumberAndPositionsMap, currentZonePositionNo,
						currentZonePositionLike, currentWidgetPosition, widgetIdTildaPostionStr);
			}
		}
	}

	/**
	 * This method is used to help the mapWidgetsOfWorkspacesToZoneNumbers() method
	 *
	 * @param currentZoneNumberAndPositionsMap - Contains details regarding zone
	 *                                         number and positions of widget
	 * @param currentZonePositionNo            - Indicates zone position number of
	 *                                         widgets
	 * @param currentZonePositionLike          - Indicates current zone positions of
	 *                                         widget
	 * @param currentWidgetPosition            - Indicates current widget position
	 * @param widgetIdTildaPostionStr          - Indicates widget's position
	 */
	public void mapWidgetsOfWorkspacesToZoneNumbersHelper(
			final Map<Integer, List<String>> currentZoneNumberAndPositionsMap, final Integer currentZonePositionNo,
			final String currentZonePositionLike, final String currentWidgetPosition,
			final String widgetIdTildaPostionStr) {
		if (currentWidgetPosition.startsWith(currentZonePositionLike)) {
			if (currentZoneNumberAndPositionsMap.containsKey(currentZonePositionNo)) {
				currentZoneNumberAndPositionsMap.get(currentZonePositionNo).add(widgetIdTildaPostionStr);
			} else {
				final List<String> zoneWidgetsList = new ArrayList<>();
				zoneWidgetsList.add(widgetIdTildaPostionStr);
				currentZoneNumberAndPositionsMap.put(currentZonePositionNo, zoneWidgetsList);
			}
		}
	}

	/**
	 * This method is used to fetch and build the Zone Key Layout map to be used in
	 * repositioning widgets in new layout.
	 *
	 * @param workspacePositionToUpdate - Contains workspace details based on
	 *                                  position
	 * @param currentWorkspaceLayout    - Contains details of all the workspaces
	 * @param zoneKeyAndLayoutConfigMap - Contains widget layout details
	 */
	public void fetchAndBuildZoneKeyLayoutConfigMap(final String workspacePositionToUpdate,
			final String currentWorkspaceLayout, final Map<String, Map<Integer, String>> zoneKeyAndLayoutConfigMap) {
		final String[] configsKeys = { currentWorkspaceLayout + STR_CONFIG, workspacePositionToUpdate + STR_CONFIG,
				workspacePositionToUpdate + DEFAULT_ZONE_KEY_END };
		final List<Map<String, String>> layoutConfigMaps = fetchZoneLayoutConfigs(configsKeys);
		for (final Map<String, String> eachZoneLayoutConfigMap : layoutConfigMaps) {
			final String currentKey = eachZoneLayoutConfigMap.get(LAYOUT_CONFIG).replace(STR_CONFIG, StringUtils.EMPTY);
			final String currentValue = eachZoneLayoutConfigMap.get(ZONE_POSITION_CONFIG);
			final String[] zoneConfigArray = currentValue.split(TILDA);
			final Integer currentZone = NumberUtils.toInt(zoneConfigArray[ZERO]);
			final String currentKeyLikeStr = currentKey.endsWith(DEFAULT_ZONE_KEY_END) ? StringUtils.EMPTY
					: zoneConfigArray[1];
			if (zoneKeyAndLayoutConfigMap.containsKey(currentKey)) {
				zoneKeyAndLayoutConfigMap.get(currentKey).put(currentZone, currentKeyLikeStr);
			} else {
				final Map<Integer, String> layoutKeyLikeMap = new HashMap<>();
				layoutKeyLikeMap.put(currentZone, currentKeyLikeStr);
				zoneKeyAndLayoutConfigMap.put(currentKey, layoutKeyLikeMap);
			}
		}
	}

	/**
	 * This method returns the workspace id of the default workspace
	 *
	 * @param existingWorkspaces - Contains details of all the existing workspaces
	 * @param workspaceId        - Unique workspace identifier
	 * @return
	 */
	public Integer checkIfThisIsDefault(final List<Map<String, Object>> existingWorkspaces,
			final String workspaceId) {
		boolean defaultFlag = false;
		int count = ZERO;
		int orderNumber = ZERO;
		for (final Map<String, Object> eachWorkspace : existingWorkspaces) {
			final Integer currentWorkspaceId = (Integer) eachWorkspace.get(WORKSPACE_IDENTIFIER);
			final Character currentDefaultIndicator = (Character) eachWorkspace.get(DEFAULT_INDICATOR);
			final boolean workspaceThatIsBeingDeleted = StringUtils
					.equals(String.valueOf(currentWorkspaceId.intValue()), StringUtils.trim(workspaceId));
			if (workspaceThatIsBeingDeleted && DEFAULT_TRUE == currentDefaultIndicator) {
				defaultFlag = true;
			}
			if (!workspaceThatIsBeingDeleted) {
				userWorkspaceDao.updateWorkspaceOrders(currentWorkspaceId, BigInteger.valueOf(orderNumber));
				orderNumber++;
			}
			if (!defaultFlag) {
				count++;
			}
		}
		final int indexOfTheRequiredWorkspace = count + ONE < existingWorkspaces.size() ? count + ONE : count - ONE;
		return defaultFlag && indexOfTheRequiredWorkspace >= ZERO
				? (Integer) existingWorkspaces.get(indexOfTheRequiredWorkspace).get(WORKSPACE_IDENTIFIER)
				: null;
	}

	/**
	 * This method helps the createWidget() method in creating a new widget
	 *
	 * @param workspaceWidget                     - Has workspaceIdentifier and
	 *                                            details of workspace
	 * @param inputLastModUser                    - Stores details of last modified
	 *                                            user
	 * @param checkForWidgetNameOnlyForUniqueness - Used to validate widget names
	 * @param loginId
	 * @return
	 */
	public UserWorkspaceWidget createWidgetHelper(final UserWorkspaceWidget workspaceWidget,
			final String inputLastModUser, final boolean checkForWidgetNameOnlyForUniqueness, final String loginId) {
		validateAndThrowExceptionWithMsg(StringUtils.isBlank(workspaceWidget.getWidgetCustomName()),
				"widgetCustomName cannot be blank or empty", HttpStatus.BAD_REQUEST);
		final BigDecimal workspaceId = BigDecimal
				.valueOf(workspaceWidget.getUserWorkspaceData().getUserWorkspaceIdentifier());
		final Map<String, String> fetchedConfigsForNameAndPosition = workspaceSupportQueriesDao
				.fetchConfigForWidgetNameAndPosition(workspaceId,
						BigDecimal.valueOf(workspaceWidget.getWidgetData().getWidgetIdentifier()),
						StringUtils.upperCase(StringUtils.trim(workspaceWidget.getWidgetCustomName())),
						NumberUtils.createBigDecimal(workspaceWidget.getAuditData().getLastModifiedUserIdentifier()));
		final String widgetPosition = fetchedConfigsForNameAndPosition.get(DEFAULT_ZONE_CONFIG)
				+ fetchedConfigsForNameAndPosition.get(COUNT_OF_WIDGETS_IN_DEFAULT);
		final String defaultHeightText = fetchedConfigsForNameAndPosition.get(DEFAULT_HEIGHT_TEXT);
		final String defaultColor = fetchedConfigsForNameAndPosition.get(DEFAULT_COLOR);
		if (StringUtils.isBlank(workspaceWidget.getWidgetHeightPixelQuality())) {
			workspaceWidget.setWidgetHeightPixelQuality(defaultHeightText);
		}
		if (StringUtils.isBlank(workspaceWidget.getWidgetColor())) {
			workspaceWidget.setWidgetColor(defaultColor);
		}
		final Integer nextSeqValForWidget = userWorkspaceWidgetDao.getNextSeqValForWidget();
		workspaceWidget.setUserWorkspaceWidgetIdentifier(nextSeqValForWidget);
		setDataUrlAndSelectedColumnsInfo(workspaceWidget, loginId, fetchedConfigsForNameAndPosition.get(URI_BEGIN));
		final String customName = widgetCustomNameGenerator(fetchedConfigsForNameAndPosition,
				workspaceWidget.getWidgetCustomName(), workspaceId, checkForWidgetNameOnlyForUniqueness);
		workspaceWidget.setWidgetCustomName(customName);
		workspaceWidget.setWidgetCustomName(StringUtils.trim(workspaceWidget.getWidgetCustomName()));
		workspaceWidget.setWidgetPositionText(widgetPosition);
		final int insertCount = userWorkspaceWidgetDao.addWidget(workspaceWidget,
				workspaceWidget.getUserWorkspaceData().getUserWorkspaceIdentifier());
		validateAndThrowExceptionWithMsg(insertCount <= ZERO, "Failed to create widget", HttpStatus.BAD_REQUEST);
		workspaceWidget.getAuditData().setLastModifiedUserIdentifier(inputLastModUser);
		addZoneWidthDetails(workspaceWidget);
		final String stndWidgetIfOfFavoriteWidget = fetchedConfigsForNameAndPosition.get(FAVORITE_WIDGET_ID);
		if (StringUtils.equals(workspaceWidget.getWidgetData().getWidgetIdentifier().toString(),
				stndWidgetIfOfFavoriteWidget)) {
			final int countOfFavoritesWidgetsForThisUser = NumberUtils
					.toInt(fetchedConfigsForNameAndPosition.get(COUNT_OF_WIDGETS_TYPE_FOR_USER));
			workspaceWidget.setCopyFavorites(countOfFavoritesWidgetsForThisUser == ZERO);
		}
		return workspaceWidget;
	}

	/**
	 * This method is used to set the data url and the defaults columns info
	 *
	 * @param workspaceWidget - Has workspaceIdentifier and details of workspace
	 * @param loginId         - Unique login identifier
	 * @param configuredUri   - Used to set uri
	 */
	public void setDataUrlAndSelectedColumnsInfo(final UserWorkspaceWidget workspaceWidget, final String loginId,
			final String configuredUri) {
		if (StringUtils.isNotBlank(configuredUri)) {
			String finalUri = configuredUri;
			if (configuredUri.contains(LOGIN_ID)) {
				finalUri = configuredUri.replace(LOGIN_ID, loginId);
			} else if (configuredUri.contains(WIDGET_ID)) {
				finalUri = configuredUri.replace(WIDGET_ID,
						workspaceWidget.getUserWorkspaceWidgetIdentifier().toString());
			}
			workspaceWidget.setDataUrlText(finalUri);
		}

		final Object selectedColumnsDefault = stndResourceObjectDao
				.fetchStndResourceObject(workspaceWidget.getWidgetData().getWidgetIdentifier().toString());
		final String value = convertObjectToString(selectedColumnsDefault);

		workspaceWidget.setSelectedColumnsAsStr(value);
	}

	/**
	 * This method ensures that the widget name generated is Unique
	 *
	 * @param fetchedConfigsForNameAndPosition - Contains details drelated to names
	 *                                         and position of widgets
	 * @param customName                       - Used to add a cutom name
	 * @param workspaceId                      - Unique workspace identifier
	 * @param checkForWidgetNameOnly           - Used to check widgets based on name
	 * @return
	 */
	public String widgetCustomNameGenerator(final Map<String, String> fetchedConfigsForNameAndPosition,
			final String customName, final BigDecimal workspaceId, final boolean checkForWidgetNameOnly) {
		String customNameLocal = customName;
		final String countKeyToCheck = checkForWidgetNameOnly ? COUNT_OF_WIDGET_NAME : COUNT_OF_WIDGETS_TYPE;
		boolean widgetNameFinalized = false;
		int countOfWidgetsTypeOrName = null != fetchedConfigsForNameAndPosition.get(countKeyToCheck)
				? NumberUtils.toInt(fetchedConfigsForNameAndPosition.get(countKeyToCheck))
				: ZERO;
		while (!widgetNameFinalized) {
			if (countOfWidgetsTypeOrName > ZERO) {
				customNameLocal = customNameLocal.length() >= WIDGET_NM_MAX_LEN_WITH_COUNT_AT_END
						? customNameLocal.substring(ZERO, WIDGET_NM_MAX_LEN_WITH_COUNT_AT_END)
						: customName + " - " + countOfWidgetsTypeOrName;
			}
			countOfWidgetsTypeOrName++;
			final boolean widgetNameExists = userWorkspaceWidgetDao.checkIfExistsGeneric(workspaceId,
					StringUtils.upperCase(StringUtils.trim(customNameLocal)), null, CHECK_IF_WIDGET_NAME_EXISTS);
			if (!widgetNameExists) {
				widgetNameFinalized = true;
			}
		}
		return customNameLocal;
	}

	/**
	 * This method is used to calculate the new positions of the widgets to be
	 * updated
	 *
	 * @param workspaceWidget                           - Contains widget details
	 * @param mapByIdentifier                           - used to map widgets and
	 *                                                  workspaces based on
	 *                                                  identifier
	 * @param updatedPositionText                       - Contains updated positions
	 *                                                  of text in a workspace
	 * @param conditionToCheckBeforeAddingCurrentWidget - Used to validate current
	 *                                                  widget
	 * @param keyLikeForUpdates                         - Unique identifier for
	 *                                                  updates
	 * @param positionIncreased                         - Contains position details
	 *                                                  of workspace
	 * @return
	 */
	public Map<Integer, String> calculateAndGetNewPositions(final UserWorkspaceWidget workspaceWidget,
			final Map<Integer, String> mapByIdentifier, final String updatedPositionText,
			final boolean conditionToCheckBeforeAddingCurrentWidget, final String keyLikeForUpdates,
			final boolean positionIncreased) {
		final Map<Integer, String> positionTextsToUpdateMap = new HashMap<>();
		for (final Map.Entry<Integer, String> eachPositionIdMapEntry : mapByIdentifier.entrySet()) {
			final String value = eachPositionIdMapEntry.getValue();
			final int key = eachPositionIdMapEntry.getKey();
			if (value.startsWith(keyLikeForUpdates) && key != workspaceWidget.getUserWorkspaceWidgetIdentifier()) {
				positionTextsToUpdateMap.put(key, value);
			}
			if (key == workspaceWidget.getUserWorkspaceWidgetIdentifier()
					&& conditionToCheckBeforeAddingCurrentWidget) {
				final String updatedPositionTextPartOne = StringUtils.substring(updatedPositionText, ZERO,
						updatedPositionText.lastIndexOf(PIPE_CHAR) + ONE);
				final double updatedPositionPartTwo = NumberUtils.toDouble(
						StringUtils.substring(updatedPositionText, updatedPositionText.lastIndexOf(PIPE_CHAR) + ONE))
						+ (positionIncreased ? ZERO_POINT_ONE : -ZERO_POINT_ONE);
				positionTextsToUpdateMap.put(key, updatedPositionTextPartOne + updatedPositionPartTwo);
			}
		}
		return sortByPositionText(positionTextsToUpdateMap);
	}

	/**
	 * This method is used to update the position texts of the widgets other than
	 * the current and returns the widget position of the current widget
	 *
	 * @param sortedMap                         - Stores details regarding widgets
	 *                                          order
	 * @param availableWidgetsAndTheirPositions - Contains all the widgets with
	 *                                          their positions
	 * @param inputWidgetDetails                - Contains the request details for
	 *                                          all the widgets
	 * @return
	 */
	public String updateWidgetPositionsOfOthersAndGetPositionOfCurrent(final Map<Integer, String> sortedMap,
			final Map<Integer, String> availableWidgetsAndTheirPositions,
			final UserWorkspaceWidget inputWidgetDetails) {
		String widgetPosition = null;
		for (final Map.Entry<Integer, String> eachSorted : sortedMap.entrySet()) {
			final Integer currWidgetId = eachSorted.getKey();
			final String currWidgetPosition = eachSorted.getValue();
			if (!StringUtils.trim(availableWidgetsAndTheirPositions.get(currWidgetId))
					.equals(StringUtils.trim(currWidgetPosition))) {
				if (!inputWidgetDetails.getUserWorkspaceWidgetIdentifier().equals(currWidgetId)) {
					final UserWorkspaceWidget widgetPositionToUpdate = new UserWorkspaceWidget();
					widgetPositionToUpdate.setUserWorkspaceWidgetIdentifier(currWidgetId);
					widgetPositionToUpdate.setAuditData(inputWidgetDetails.getAuditData());
					widgetPositionToUpdate.setWidgetPositionText(currWidgetPosition);
					final int positionUpateStatus = userWorkspaceWidgetDao.updateWidgetPosition(widgetPositionToUpdate);
					log.info((positionUpateStatus > ZERO ? "Successfully updated position of widget id"
							: "failed to update position of widget id") + currWidgetId);
				} else {
					widgetPosition = currWidgetPosition;
				}
			}
		}
		return widgetPosition;
	}

	/**
	 * This method is used to sort the widgets by position text for get
	 *
	 * @param positionTextsToUpdateMap - Used to map the positions related to a
	 *                                 widget
	 * @return
	 */
	public Map<Integer, String> sortByPositionText(final Map<Integer, String> positionTextsToUpdateMap) {
		final Map<String, Integer> tempMapForSorting = new HashMap<>();
		for (final Map.Entry<Integer, String> eachPositionTextToUpdateEntry : positionTextsToUpdateMap.entrySet()) {
			tempMapForSorting.put(eachPositionTextToUpdateEntry.getValue(), eachPositionTextToUpdateEntry.getKey());
		}
		return sortWidgetByPositionsTextForUpdate(tempMapForSorting);
	}

	/**
	 * this method helps the sortWidgetsByOrder() method in sorting the widgets by
	 * position text
	 *
	 * @param widgetMapByPositionText - Used to map the positions of widget
	 * @return
	 */
	public Map<Integer, String> sortWidgetByPositionsTextForUpdate(final Map<String, Integer> widgetMapByPositionText) {
		final Map<Integer, Map<Integer, List<Double>>> rowColumnOrderMap = new HashMap<>();
		for (final Entry<String, Integer> eachEntry : widgetMapByPositionText.entrySet()) {
			final String[] currentRowColumnOrderArray = StringUtils.splitByWholeSeparator(eachEntry.getKey(),
					SEPARATOR_DOUBLE_PIPE);
			final int currentRow = NumberUtils.toInt(currentRowColumnOrderArray[0]);
			final int currentColumn = NumberUtils.toInt(currentRowColumnOrderArray[1]);
			final double currentOrder = NumberUtils.toDouble(currentRowColumnOrderArray[2]);
			if (rowColumnOrderMap.containsKey(currentRow)) {
				if (rowColumnOrderMap.get(currentRow).containsKey(currentColumn)) {
					rowColumnOrderMap.get(currentRow).get(currentColumn).add(currentOrder);
				} else {
					final List<Double> orderList = new ArrayList<>();
					orderList.add(currentOrder);
					rowColumnOrderMap.get(currentRow).put(currentColumn, orderList);
				}
			} else {
				final Map<Integer, List<Double>> columnOrderMap = new HashMap<>();
				final List<Double> orderList = new ArrayList<>();
				orderList.add(currentOrder);
				columnOrderMap.put(currentColumn, orderList);
				rowColumnOrderMap.put(currentRow, columnOrderMap);
			}
		}
		return sortWidgetByPositionsTxtHelperForUpdate(rowColumnOrderMap, widgetMapByPositionText);
	}

	/**
	 * This method is used to sort widgets by position texts for update and delete
	 * widget functionality
	 *
	 * @param rowColumnOrderMap       - Used to map all the rows in a widget
	 * @param widgetMapByPositionText - Used to map the positions of widget
	 * @return
	 */
	public Map<Integer, String> sortWidgetByPositionsTxtHelperForUpdate(
			final Map<Integer, Map<Integer, List<Double>>> rowColumnOrderMap,
			final Map<String, Integer> widgetMapByPositionText) {
		final Map<Integer, String> sortedByPositionWidgetsIdPositionMap = new LinkedHashMap<>();
		final Map<Integer, Map<Integer, List<Double>>> rowColumnOrderMapSorted = new TreeMap<>(rowColumnOrderMap);
		Integer currentSortedRow;
		Integer currentSortedColumn;
		for (final Map.Entry<Integer, Map<Integer, List<Double>>> eachRowColumnOrderMapEntry : rowColumnOrderMapSorted
				.entrySet()) {
			currentSortedRow = eachRowColumnOrderMapEntry.getKey();
			final Map<Integer, List<Double>> columnOrderMapSorted = new TreeMap<>(
					eachRowColumnOrderMapEntry.getValue());
			for (final Map.Entry<Integer, List<Double>> columnOrderMapSortedEntry : columnOrderMapSorted.entrySet()) {
				currentSortedColumn = columnOrderMapSortedEntry.getKey();
				final List<Double> sortedOrders = columnOrderMapSortedEntry.getValue();
				Collections.sort(sortedOrders);
				int newOrders = ZERO;
				for (final Double eachSortedOrder : sortedOrders) {
					final Double localSortedOrder = eachSortedOrder;
					final String eachSortedRowColumn = currentSortedRow + SEPARATOR_DOUBLE_PIPE + currentSortedColumn
							+ SEPARATOR_DOUBLE_PIPE;
					String localSortedOrderStr = localSortedOrder.toString();
					localSortedOrderStr = localSortedOrderStr.endsWith(POINT_ZERO_STR)
							? localSortedOrderStr.replace(POINT_ZERO_STR, StringUtils.EMPTY)
							: localSortedOrderStr;
					final int localWorkspaceWidgetId = widgetMapByPositionText
							.get(eachSortedRowColumn + localSortedOrderStr);
					final String eachSortedRowColumnOrder = eachSortedRowColumn + newOrders;
					sortedByPositionWidgetsIdPositionMap.put(localWorkspaceWidgetId, eachSortedRowColumnOrder);
					newOrders++;
				}
			}
		}
		return sortedByPositionWidgetsIdPositionMap;
	}

	/**
	 * This method is used to create maps by id and order from the input list of
	 * widgets details
	 *
	 * @param mapByIdentifier        - Used to map widgets by identifier
	 * @param mapByOrder             - Used to order widgets
	 * @param availableWidgetDetails - Contains details of the active widgets
	 */
	public void generateMapByWidgetIdAndOrder(final Map<Integer, String> mapByIdentifier,
			final Map<String, Integer> mapByOrder, final List<UserWorkspaceAndWidgetDetail> availableWidgetDetails) {
		for (final UserWorkspaceAndWidgetDetail eachAvailWidget : availableWidgetDetails) {
			if (null != eachAvailWidget.getWidgetIdentifier()) {
				mapByIdentifier.put(eachAvailWidget.getWidgetIdentifier().intValue(),
						eachAvailWidget.getWidgetPosition());
				mapByOrder.put(eachAvailWidget.getWidgetPosition(), eachAvailWidget.getWidgetIdentifier().intValue());
			}
		}
	}

	/**
	 * This method is used to add the zone width details for the input widget
	 * details
	 *
	 * @param userWorkspaceWidget - Contains widget details
	 */
	public void addZoneWidthDetails(final UserWorkspaceWidget userWorkspaceWidget) {
		if (StringUtils.isNotBlank(userWorkspaceWidget.getWidgetPositionText())) {
			final String positionLike = StringUtils.substring(userWorkspaceWidget.getWidgetPositionText(), ZERO,
					userWorkspaceWidget.getWidgetPositionText().lastIndexOf(PIPE_CHAR) + ONE);
			final List<Map<String, String>> zoneConfigAndStructure = workspaceSupportQueriesDao
					.fetchWidgetZoneAndWorkspaceStructure(
							BigDecimal.valueOf(userWorkspaceWidget.getUserWorkspaceData().getUserWorkspaceIdentifier()),
							positionLike);
			String zoneConfig = null;
			String structure = null;
			String structureMap = null;
			for (final Map<String, String> eachMap : zoneConfigAndStructure) {
				zoneConfig = checkIfExistsInMapAndGetValue(ZONE_CONFIG, eachMap, zoneConfig);
				structure = checkIfExistsInMapAndGetValue(STRUCTURE_STR, eachMap, structure);
				structureMap = checkIfExistsInMapAndGetValue(STRUCTURE_MAP, eachMap, structureMap);
			}
			addZoneWidthDetailsHelper(userWorkspaceWidget, zoneConfig, structure, structureMap);
		}
	}

	/**
	 * This method is used to help the addZoneWidthDetails() in adding zone width
	 *
	 * @param userWorkspaceWidget - widget Details
	 * @param zoneConfig          - Current zone configuration
	 * @param structure           - Current workspace structure
	 * @param structureMap        - Structure configuration map
	 */
	public void addZoneWidthDetailsHelper(final UserWorkspaceWidget userWorkspaceWidget, final String zoneConfig,
			final String structure, final String structureMap) {
		if (StringUtils.isNotBlank(zoneConfig) && null != structure && null != structureMap) {
			final int index = Arrays.asList(structureMap.split(HYPHEN)).indexOf(zoneConfig);
			final String[] structureArray = structure.split(HYPHEN);
			if (index >= ZERO && structureArray.length >= index) {
				userWorkspaceWidget.setZoneWidth(NumberUtils.toInt(structureArray[index]));
			}
		}
	}

	/**
	 * This method fetches the zone layout settings for workspace layouts
	 *
	 *
	 * @param keys - The code reference keys to look for
	 * @return
	 */
	public List<Map<String, String>> fetchZoneLayoutConfigs(final String[] keys) {
		final List<CodeReferenceLookup> listCodeReferenceList = codeReferenceDao
				.fetchCodeReferenceByTypeCodeIn(Arrays.asList(keys));

		final List<Map<String, String>> listMapKeyValue = new ArrayList<>();

		if (CollectionUtils.isNotEmpty(listCodeReferenceList)) {
			for (final CodeReferenceLookup codeReferenceEntity : listCodeReferenceList) {
				final Map<String, String> map = new ConcurrentHashMap<>();
				map.put(LAYOUT_CONFIG, codeReferenceEntity.getTypeCode());
				map.put(ZONE_POSITION_CONFIG, codeReferenceEntity.getValueText());
				listMapKeyValue.add(map);
			}
		}
		return listMapKeyValue;
	}

	/**
	 * This method is used to check if the value exists in map and get the value
	 */
	private String checkIfExistsInMapAndGetValue(final String key, final Map<String, String> eachMap,
			final String currentValStr) {
		String returnVal = currentValStr;
		if (StringUtils.isEmpty(returnVal) && eachMap.containsKey(key)) {
			returnVal = eachMap.get(key);
		}
		return returnVal;
	}
}
