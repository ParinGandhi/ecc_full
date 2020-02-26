package gov.uspto.patent.ptab.helper;

import static gov.uspto.patent.ptab.utils.PTABServiceUtils.validateAndThrowExceptionWithMsg;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.math.NumberUtils;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;

import gov.uspto.patent.ptab.dao.UserWorkspaceWidgetDao;
import gov.uspto.patent.ptab.dao.WorkspaceSupportQueriesDao;
import gov.uspto.patent.ptab.domain.UserWorkspace;
import gov.uspto.patent.ptab.domain.UserWorkspaceAndWidgetsInformation;
import gov.uspto.patent.ptab.domain.UserWorkspaceWidget;
import gov.uspto.patent.ptab.domain.WidgetMetaData;
import gov.uspto.patent.ptab.domain.WidgetsByZones;
import gov.uspto.patent.ptab.domain.named.query.UserWorkspaceAndWidgetDetail;

import gov.uspto.patent.ptab.utils.ErrorPayload;
import gov.uspto.patent.ptab.utils.PTABException;
import lombok.extern.slf4j.Slf4j;

/**
 * This is helper class which has the business logic for fetching and managing
 * UserWorkspaces
 *
 * @author 2020 development team
 *
 */
@Component
@Validated
@Slf4j
@PropertySource("classpath:ptab_application_messages.properties")
public class WidgetDaoHelper {

	private static final String DOUBLE_PIPE = "||";

	private static final int ONE = 1;

	private static final String HYPHEN = "-";

	private static final String WIDGET_NAME = "widgetName";

	private static final int ZERO = 0;

	private static final String CHECK_IF_WIDGET_EXISTS = "checkIfWidgetExists";

	private static final String QUERY_NAME_FOR_ZONES_CONFIG = "getWorkspaceAndWidgetDetailsForWorkspaceIdForZones";

	private static final String NO_WORKSPACE_WITH_ID_MSG_BGN = "No workspace with id ";

	private static final String FOUND = " found.";

	@Autowired
	private WorkspaceDaoHelper workspaceDaoHelper;

	@Autowired
	private UserWorkspaceWidgetDao userWorkspaceWidgetDao;

	@Autowired
	private WorkspaceSupportQueriesDao workspaceSupportQueriesDao;

	/**
	 * This method is used to update the selected columns for the input widget Id
	 *
	 * @param widgetDetails - The widget details consisting of widget id and columns
	 *                      selected details
	 */

	/*
	 * public Object updateSelectedColmuns(final UserWorkspaceWidget widgetDetails)
	 * { final BigDecimal widgetId = new
	 * BigDecimal(widgetDetails.getUserWorkspaceWidgetIdentifier()); final boolean
	 * widgetExists = userWorkspaceWidgetDao.checkIfExistsGeneric(widgetId, null,
	 * null, CHECK_IF_WIDGET_EXISTS);
	 * validateAndThrowExceptionWithMsg(!widgetExists, "No widget with id " +
	 * widgetDetails.getUserWorkspaceWidgetIdentifier() + FOUND,
	 * HttpStatus.BAD_REQUEST); final WidgetMetaData widgetsMetaData = new
	 * WidgetMetaData();
	 * widgetsMetaData.setSelectedColumns(widgetDetails.getSelectedColumns());
	 * widgetsMetaData.setPaginationSize(widgetDetails.getPaginationSize()); final
	 * String selectedColumnsDetails = new Gson().toJson(widgetsMetaData); final int
	 * updateCount = updateColumns(widgetId, selectedColumnsDetails);
	 * log.info("Update of selected columns for widget with id " + widgetId +
	 * (updateCount > ZERO ? " was successful" : " failed"));
	 * 
	 * Object returnMessage; try { returnMessage = mixedCaseDocketHelper
	 * .retrieveDocketDetails(String.valueOf(widgetDetails.
	 * getUserWorkspaceWidgetIdentifier()), null, null); } catch (final Exception e)
	 * { log.error("Error occured while fetching mixed case docket", e);
	 * returnMessage = new ErrorPayload("Successfully Updated Columns"); } return
	 * returnMessage; }
	 */

	@Transactional
	public int updateColumns(final BigDecimal widgetId, final String selectedColumnsDetails) {
		return userWorkspaceWidgetDao.updateSelectedColumnsForAWidget(widgetId, selectedColumnsDetails);
	}

	/**
	 * This method is used to fetch the selected columns for the input widget id
	 *
	 * @param inputWidgetId - Unique Widget identifier
	 */
	@Transactional(readOnly = true)
	public UserWorkspaceWidget fetchSelectedColmuns(final String inputWidgetId) {
		final BigDecimal widgetId = NumberUtils.createBigDecimal(inputWidgetId);
		final Map<String, String> fetchedMapNameAndSelectedColumns = userWorkspaceWidgetDao
				.fetchSelectedColumnsDetails(widgetId);
		validateAndThrowExceptionWithMsg(StringUtils.isEmpty(fetchedMapNameAndSelectedColumns.get(WIDGET_NAME)),
				"No widget with id " + inputWidgetId + FOUND, HttpStatus.BAD_REQUEST);

		final String selectedColumnsDetails = fetchedMapNameAndSelectedColumns.get("selectedColumns");

		WidgetMetaData widgetMetaData = null;

		try {
			widgetMetaData = new ObjectMapper().readValue(selectedColumnsDetails, WidgetMetaData.class);
		} catch (final IOException e) {
			log.error("Error occured while converting the Selected columns JSON to Object" + selectedColumnsDetails, e);
			throw new PTABException(HttpStatus.NOT_FOUND,
					new ErrorPayload("No Selected columns found for widget" + widgetId));
		}

		final UserWorkspaceWidget userWorkspaceWidget = new UserWorkspaceWidget();
		userWorkspaceWidget.setUserWorkspaceWidgetIdentifier(widgetId.intValue());
		userWorkspaceWidget.setPaginationSize(widgetMetaData.getPaginationSize());
		userWorkspaceWidget.setSelectedColumns(widgetMetaData.getSelectedColumns());
		return userWorkspaceWidget;

	}

	/**
	 * This method is used to fetch the widgets, sort them and them split them by
	 * zones for a given workspace id
	 *
	 * @param workspaceId - Unique workspace identifier
	 * @return
	 */
	@Transactional(readOnly = true)
	public WidgetsByZones fetchWidgetsForAWorkspaceAndSplitThemIntoZones(final String workspaceId) {
		validateAndThrowExceptionWithMsg(StringUtils.isBlank(workspaceId), "workspaceId is mandatory",
				HttpStatus.BAD_REQUEST);
		final Integer workspaceIdentifierAsInt = NumberUtils.toInt(workspaceId);
		final List<UserWorkspaceAndWidgetDetail> workspaceWidgetDetails = workspaceSupportQueriesDao
				.getWidgetPositionSummaryForWorkspaceId(workspaceIdentifierAsInt, QUERY_NAME_FOR_ZONES_CONFIG);
		validateAndThrowExceptionWithMsg(CollectionUtils.isEmpty(workspaceWidgetDetails),
				NO_WORKSPACE_WITH_ID_MSG_BGN + workspaceIdentifierAsInt + FOUND, HttpStatus.BAD_REQUEST);

		final Map<Integer, List<UserWorkspaceWidget>> zoneWidgetsMap = new HashMap<>();

		List<String> structureMappingList = null;
		for (final UserWorkspaceAndWidgetDetail eachWidgetDetail : workspaceWidgetDetails) {
			final UserWorkspaceWidget eachWidget = new UserWorkspaceWidget();
			eachWidget.setWidgetCustomName(eachWidgetDetail.getWidgetName());
			eachWidget.setWidgetPositionText(eachWidgetDetail.getWidgetPosition());
			eachWidget.setUserWorkspaceWidgetIdentifier(eachWidgetDetail.getWidgetIdentifier().intValue());
			if (null == structureMappingList
					&& StringUtils.isNotBlank(eachWidgetDetail.getWorkspaceStructureMapping())) {
				structureMappingList = Arrays.asList(eachWidgetDetail.getWorkspaceStructureMapping().split(HYPHEN));
			}

			final Integer zoneNumber = fetchZoneNumber(structureMappingList, eachWidgetDetail.getWidgetPosition());
			if (null != zoneNumber && ZERO != zoneNumber) {
				if (zoneWidgetsMap.containsKey(zoneNumber)) {
					zoneWidgetsMap.get(zoneNumber).add(eachWidget);
				} else {
					final List<UserWorkspaceWidget> widgetsInThisZone = new ArrayList<>();
					widgetsInThisZone.add(eachWidget);
					zoneWidgetsMap.put(zoneNumber, widgetsInThisZone);
				}
			}
		}

		final Map<Integer, List<UserWorkspaceWidget>> zoneWidgetsMapWithSortedWidgets = new HashMap<>();

		fetchWidgetsForAWorkspaceAndSplitThemIntoZonesHelper(zoneWidgetsMap, structureMappingList,
				zoneWidgetsMapWithSortedWidgets);

		return new WidgetsByZones(workspaceIdentifierAsInt, new TreeMap<>(zoneWidgetsMapWithSortedWidgets));

	}

	/**
	 * This method is used to update the widget positions based on zones in bulk
	 *
	 * @param widgetsByZones - Widgets with new positions categorized by Zone
	 *                       numbers
	 */
	@Transactional(readOnly = false)
	public UserWorkspaceAndWidgetsInformation updateWidgetsPositionByZones(final WidgetsByZones widgetsByZones) {

		final List<UserWorkspaceAndWidgetDetail> workspaceWidgetDetails = workspaceSupportQueriesDao
				.getWidgetPositionSummaryForWorkspaceId(widgetsByZones.getUserWorkspaceIdentifier(),
						QUERY_NAME_FOR_ZONES_CONFIG);

		validateAndThrowExceptionWithMsg(CollectionUtils.isEmpty(workspaceWidgetDetails),
				NO_WORKSPACE_WITH_ID_MSG_BGN + widgetsByZones.getUserWorkspaceIdentifier() + FOUND,
				HttpStatus.BAD_REQUEST);

		final Map<Integer, String> widgetIdPositionMap = new HashMap<>();
		String[] workspaceStructureMappingArray = null;

		for (final UserWorkspaceAndWidgetDetail eachWorkspaceWidgetDetail : workspaceWidgetDetails) {
			if (null == workspaceStructureMappingArray) {
				workspaceStructureMappingArray = eachWorkspaceWidgetDetail.getWorkspaceStructureMapping().split(HYPHEN);
			}
			widgetIdPositionMap.put(eachWorkspaceWidgetDetail.getWidgetIdentifier().intValue(),
					eachWorkspaceWidgetDetail.getWidgetPosition());
		}

		final Map<Integer, List<UserWorkspaceWidget>> zoneWidgetsMap = widgetsByZones.getZoneWidgetsMap();

		for (final Map.Entry<Integer, List<UserWorkspaceWidget>> eachZoneWidgetsMapEntry : zoneWidgetsMap.entrySet()) {
			final Integer currentZoneNumber = eachZoneWidgetsMapEntry.getKey();
			final List<UserWorkspaceWidget> allWidgetsInThisZone = eachZoneWidgetsMapEntry.getValue();
			final String positionTextBeginForThisZone = workspaceStructureMappingArray[currentZoneNumber.intValue()
					- ONE];
			int positionCounter = ZERO;
			for (final UserWorkspaceWidget eachWidgetInThisZone : allWidgetsInThisZone) {
				eachWidgetInThisZone
						.setWidgetPositionText(positionTextBeginForThisZone + DOUBLE_PIPE + positionCounter);
				if (!StringUtils.equals(
						widgetIdPositionMap.get(eachWidgetInThisZone.getUserWorkspaceWidgetIdentifier()),
						eachWidgetInThisZone.getWidgetPositionText())) {
					final int updateStatus = userWorkspaceWidgetDao.updateWidgetPosition(eachWidgetInThisZone);
					log.info("Position update for widget with id "
							+ eachWidgetInThisZone.getUserWorkspaceWidgetIdentifier()
							+ (updateStatus > ZERO ? " was successful." : " failed"));
				}
				positionCounter++;
			}

		}

		return workspaceDaoHelper.fetchUserWorkspaceDetailsByUserIdOrWorkspaceId(null,
				widgetsByZones.getUserWorkspaceIdentifier());

	}

	/**
	 * This method is used to help the
	 * fetchWidgetsForAWorkspaceAndSplitThemIntoZones() method in sorting and
	 * ordering the widgets by position texts
	 */
	private void fetchWidgetsForAWorkspaceAndSplitThemIntoZonesHelper(
			final Map<Integer, List<UserWorkspaceWidget>> zoneWidgetsMap, final List<String> structureMappingList,
			final Map<Integer, List<UserWorkspaceWidget>> zoneWidgetsMapWithSortedWidgets) {
		for (final Map.Entry<Integer, List<UserWorkspaceWidget>> eachZoneWidgetMapEntry : zoneWidgetsMap.entrySet()) {
			final UserWorkspace eachWorkspace = new UserWorkspace();
			eachWorkspace.setUserWorkspaceWidgetsData(eachZoneWidgetMapEntry.getValue());
			workspaceDaoHelper.sortWidgetsByOrderHelper(eachWorkspace);
			zoneWidgetsMapWithSortedWidgets.put(eachZoneWidgetMapEntry.getKey(),
					eachWorkspace.getUserWorkspaceWidgetsData());
		}
		if (null != structureMappingList) {
			for (int i = ONE; i <= structureMappingList.size(); i++) {
				if (!zoneWidgetsMapWithSortedWidgets.containsKey(i)) {
					zoneWidgetsMapWithSortedWidgets.put(i, Collections.emptyList());
				}
			}
		}
	}

	/**
	 * This method fetches the zone number
	 */
	private Integer fetchZoneNumber(final List<String> structureMappingList, final String currentWidgetPosition) {
		Integer zoneNumber = null;
		if (StringUtils.isNotBlank(currentWidgetPosition) && CollectionUtils.isNotEmpty(structureMappingList)) {
			final String positionLike = StringUtils.substring(currentWidgetPosition, ZERO,
					currentWidgetPosition.lastIndexOf(DOUBLE_PIPE));
			zoneNumber = structureMappingList.indexOf(positionLike) + ONE;
		}
		return zoneNumber;
	}

}
