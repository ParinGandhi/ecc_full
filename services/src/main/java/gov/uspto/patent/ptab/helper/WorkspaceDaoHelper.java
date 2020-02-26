package gov.uspto.patent.ptab.helper;

import static gov.uspto.patent.ptab.utils.PTABConstants.ONE;
import static gov.uspto.patent.ptab.utils.PTABConstants.TWO;
import static gov.uspto.patent.ptab.utils.PTABConstants.ZERO;
import static gov.uspto.patent.ptab.utils.PTABServiceUtils.convertObjectToString;
import static gov.uspto.patent.ptab.utils.PTABServiceUtils.notFoundIfNullCollection;
import static gov.uspto.patent.ptab.utils.PTABServiceUtils.validateAndThrowExceptionWithMsg;
import static gov.uspto.patent.ptab.utils.PTABServiceUtils.validateConditionAndThrowException;
import static gov.uspto.patent.ptab.utils.PTABServiceUtils.validateConditionAndThrowExceptionStatus;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.concurrent.ConcurrentHashMap;

import javax.validation.constraints.NotNull;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.collections4.MapUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.math.NumberUtils;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;

import gov.uspto.patent.ptab.dao.CodeReferenceDao;
import gov.uspto.patent.ptab.dao.UserWorkspaceDao;
import gov.uspto.patent.ptab.dao.UserWorkspaceWidgetDao;
import gov.uspto.patent.ptab.domain.ApplicationUserResponse;
import gov.uspto.patent.ptab.domain.CodeReferenceLookup;
import gov.uspto.patent.ptab.domain.StandardViewLayout;
import gov.uspto.patent.ptab.domain.StandardWidget;
import gov.uspto.patent.ptab.domain.StandardWidgetSummary;
import gov.uspto.patent.ptab.domain.StandardWidgetsEntity;
import gov.uspto.patent.ptab.domain.StndWidgetSubcategoryInfo;
import gov.uspto.patent.ptab.domain.UserWorkspace;
import gov.uspto.patent.ptab.domain.UserWorkspaceAndWidgetsInformation;
import gov.uspto.patent.ptab.domain.UserWorkspaceSummary;
import gov.uspto.patent.ptab.domain.UserWorkspaceWidget;
import gov.uspto.patent.ptab.domain.named.query.UserWorkspaceAndWidgetDetail;
import gov.uspto.patent.ptab.entities.support.UserWorkspaceQuery;
import lombok.extern.slf4j.Slf4j;

/**
 * This is helper class which has the business logic for fetching and managing UserWorkspaces
 *
 * @author 2020 development team
 *
 */
@Component
@Validated
@Slf4j
@PropertySource("classpath:ptab_application_messages.properties")
public class WorkspaceDaoHelper extends WorkspaceDaoCommonHelper {

    private static final String HYPHEN = "-";
    private static final String TILDA = "~";
    private static final String NO_STND_WIDGETS_FOUND = "no.stnd.widgets.found";
    private static final String USER_ID_OR_WORKSPACE_ID_NEEDED = "user.id.or.workspace.id.needed";
    private static final String WIDGET_ALREADY_EXISTS_MSG_END = " already exists for "
            + "this workspace. Please enter a different name";
    private static final int MAX_LENGTH_OF_WIDGET_NAME_ALLOWED = 200;

    @Autowired
    private UserWorkspaceDao userWorkspaceDao;

    @Autowired
    private UserWorkspaceWidgetDao userWorkspaceWidgetDao;

    @Autowired
    private CodeReferenceDao codeReferenceDao;

    @Value("${max.no.of.workspaces}")
    private int maxNoOfWorkspacesAllowed;

    /**
     * This method fetches the defaults for the workspaces
     *
     * @return
     */
    @Transactional(readOnly = true)
    public Map<String, Object> fetchWorkspaceDefaults() {
        final List<Map<String, String>> defaultSettingsMaps = fetchDefaultSettingsForWorkSpaces();
        validateConditionAndThrowException(CollectionUtils.isEmpty(defaultSettingsMaps),
                "no.wrkspc.defaults.settings.found");
        final Map<String, Object> returnMap = new HashMap<>();
        for (final Map<String, String> eachDefaultSettingsMap : defaultSettingsMaps) {
            final String key = eachDefaultSettingsMap.get(KEY_STR);
            final Object value = StringUtils.isNumeric(eachDefaultSettingsMap.get(VAL_STR))
                    ? NumberUtils.toInt(eachDefaultSettingsMap.get(VAL_STR)) : eachDefaultSettingsMap.get(VAL_STR);
            returnMap.put(key, value);
        }
        return returnMap;
    }

    /**
     * This method is used to fetch the standard widgets defaults
     *
     * @return
     */
    @Transactional(readOnly = true)
    public List<StandardWidget> fetchStandardWidgets() {
        final List<StandardWidgetsEntity> standardWidgetsEntityList = workspaceSupportQueriesDao.fetchStndWidgets();
        validateConditionAndThrowException(CollectionUtils.isEmpty(standardWidgetsEntityList), NO_STND_WIDGETS_FOUND);
        final List<StandardWidget> availableStndWidgets = new ArrayList<>();
        final ObjectMapper objectMapper = new ObjectMapper();
        for (final StandardWidgetsEntity eachStndWidgetEntity : standardWidgetsEntityList) {
            final String currentSubCategoryIdentifier = String.valueOf(eachStndWidgetEntity.getSubCategoryId().intValue());
            final String currentIdentifier = String.valueOf(eachStndWidgetEntity.getIdentifier().intValue());
            final StandardWidget eachReturnStndWidget = new StandardWidget();
            eachReturnStndWidget.setConfigText(eachStndWidgetEntity.getConfigText());
            eachReturnStndWidget.setDisplayOrder(eachStndWidgetEntity.getDisplayOrder().intValue());
            eachReturnStndWidget.setIdentifier(currentIdentifier);
            eachReturnStndWidget.setNoteText(eachStndWidgetEntity.getNoteText());
            eachReturnStndWidget.setWidgetName(eachStndWidgetEntity.getWidgetName());
            eachReturnStndWidget.setColumnsDetails(convertColumnJsonToWidgetColumn(currentIdentifier, objectMapper));
            eachReturnStndWidget.setWidgetDataUrlText(eachStndWidgetEntity.getStndWidgetDataUrlText());
            final StndWidgetSubcategoryInfo currentSubCategoryInfo = new StndWidgetSubcategoryInfo();
            currentSubCategoryInfo.setSubcategoryIdentifier(currentSubCategoryIdentifier);
            currentSubCategoryInfo.setSubcategoryName(eachStndWidgetEntity.getSubCategoryName());
            eachReturnStndWidget.setSubcategoryInfo(currentSubCategoryInfo);
            availableStndWidgets.add(eachReturnStndWidget);
        }
        return availableStndWidgets;
    }

    /**
     * This method is used to fetch the User Workspace and Its containing Widgets details for a input worker Identifier
     *
     * @param userWorkspaceQuery - Query object which is used to query either by user id or user workspace id
     * @return
     */
    @Transactional(readOnly = true)
    public UserWorkspaceAndWidgetsInformation fetchUserWorkspaceDetails(
            @NotNull final UserWorkspaceQuery userWorkspaceQuery) {
        validateConditionAndThrowException(StringUtils.isBlank(userWorkspaceQuery.getUserIdentifier())
                && null == userWorkspaceQuery.getUserWorkspaceIdentifier(), USER_ID_OR_WORKSPACE_ID_NEEDED);
        if (StringUtils.isNotBlank(userWorkspaceQuery.getUserIdentifier())) {
            log.info("Fetching the Workspace and Widget Details for worker {} ", userWorkspaceQuery.getUserIdentifier());
            final String userId = validateUserId(userWorkspaceQuery.getUserIdentifier());
            return fetchUserWorkspaceDetailsByUserIdOrWorkspaceId(userId, null);
        } else {
            log.info("Fetching the Workspace and Widget Details for workspace id {} ",
                    userWorkspaceQuery.getUserWorkspaceIdentifier());
            return fetchUserWorkspaceDetailsByUserIdOrWorkspaceId(null, userWorkspaceQuery.getUserWorkspaceIdentifier());
        }
    }

    /**
     * This method is used to fetch the User Workspace and Its containing Widgets details for a input worker Identifier
     *
     * @param userId - Unique identifier used to identify an user
     * @param workspaceId - Unique identifier used to identify a workspace
     * @return
     */
    public UserWorkspaceAndWidgetsInformation fetchUserWorkspaceDetailsByUserIdOrWorkspaceId(final String userId,
            final Integer workspaceId) {
        List<UserWorkspaceAndWidgetDetail> workspaceWidgetDetails;
        if (StringUtils.isNotBlank(userId)) {
            workspaceWidgetDetails = workspaceSupportQueriesDao.fetchUserWorkspaceAndWidgetDetails(userId);
        } else {
            workspaceWidgetDetails = workspaceSupportQueriesDao.getWorkspaceAndWidgetDetailsForWorkspaceId(workspaceId);
        }
        notFoundIfNullCollection(workspaceWidgetDetails, NO_WRKSPC_WIDGET_DETAILS_FOUND_KEY);
        final UserWorkspaceAndWidgetsInformation returnUserWorkspaceDetail = new UserWorkspaceAndWidgetsInformation();
        ApplicationUserResponse userInfo = null;
        final List<UserWorkspace> workspaces = new ArrayList<>();
        final Map<Integer, UserWorkspace> workspaceMap = new HashMap<>();
        for (final UserWorkspaceAndWidgetDetail eachWorkspaceAndWidgetDetail : workspaceWidgetDetails) {
            if (null == userInfo) {
                userInfo = new ApplicationUserResponse();
                userInfo.setFirstName(eachWorkspaceAndWidgetDetail.getFirstName());
                userInfo.setMiddleName(eachWorkspaceAndWidgetDetail.getMiddleName());
                userInfo.setLastName(eachWorkspaceAndWidgetDetail.getLastName());
                userInfo.setEmailAddressText(eachWorkspaceAndWidgetDetail.getEmailAddressText());
                returnUserWorkspaceDetail.setApplicationUserData(userInfo);
            }
            addWorkspaceLimitationDetails(returnUserWorkspaceDetail, eachWorkspaceAndWidgetDetail);
            final Integer currentWorkspaceId = eachWorkspaceAndWidgetDetail.getWorkspaceIdentifier().intValue();
            final UserWorkspace eachWorkspace = checkIfWorkspaceAlreadyExistsAndAddDetails(workspaceMap,
                    eachWorkspaceAndWidgetDetail, currentWorkspaceId);
            populateWidgetDetails(eachWorkspace, eachWorkspaceAndWidgetDetail);
            workspaceMap.put(currentWorkspaceId, eachWorkspace);
        }
        final Map<Integer, List<UserWorkspace>> workspaceSorted = new HashMap<>();
        iterateAndSortWorkspacesByOrder(workspaceMap, workspaceSorted);
        for (final Map.Entry<Integer, List<UserWorkspace>> eachSorted : new TreeMap<>(workspaceSorted).entrySet()) {
            workspaces.addAll(eachSorted.getValue());
        }
        returnUserWorkspaceDetail.setApplicationUserData(userInfo);
        sortWidgetsByOrder(workspaces);
        returnUserWorkspaceDetail.setUserWorkspaces(workspaces);
        return returnUserWorkspaceDetail;
    }

    /**
     * This method helps in deleting a widget
     *
     * @param widgetId - Unique widget identifier
     */
    @Transactional(readOnly = false)
    public void deleteWidget(@NotNull final String widgetId) {
        log.info("Deleting the widget having the widget id - {}", widgetId);
        final Integer currwntWidgetId = NumberUtils.toInt(widgetId);
        final List<UserWorkspaceAndWidgetDetail> availableWidgets = userWorkspaceWidgetDao
                .fetchAllWidgetsForInputWidgetsWorkspace(currwntWidgetId);
        final Map<Integer, String> mapByIdentifier = new HashMap<>();
        final Map<String, Integer> mapByOrder = new HashMap<>();
        generateMapByWidgetIdAndOrder(mapByIdentifier, mapByOrder, availableWidgets);
        validateAndThrowExceptionWithMsg(!mapByIdentifier.containsKey(currwntWidgetId),
                "No Widget with id " + widgetId + MSG_END_FOUND_TO_DELETE, HttpStatus.BAD_REQUEST);
        final String positionOfWQidgetBeingDeleted = mapByIdentifier.get(currwntWidgetId);
        final String keyLikeForFirstSetOfUpdates = StringUtils.substring(positionOfWQidgetBeingDeleted, 0,
                positionOfWQidgetBeingDeleted.lastIndexOf(PIPE_CHAR) + 1);
        final UserWorkspaceWidget workspaceWidget = new UserWorkspaceWidget();
        workspaceWidget.setUserWorkspaceWidgetIdentifier(currwntWidgetId);
        final Map<Integer, String> sortedMapFirst = calculateAndGetNewPositions(workspaceWidget, mapByIdentifier,
                positionOfWQidgetBeingDeleted, false, keyLikeForFirstSetOfUpdates, false);
        updateWidgetPositionsOfOthersAndGetPositionOfCurrent(sortedMapFirst, mapByIdentifier, workspaceWidget);
        final int deleteStatus = userWorkspaceWidgetDao.deleteWidget(widgetId);
        validateAndThrowExceptionWithMsg(deleteStatus <= 0, "Widget with id " + widgetId + " failed to delete.",
                HttpStatus.BAD_REQUEST);
    }

    /**
     * This method is used to update the Workspace Layout
     *
     * @param workspaceDetails - Worskapce details with the new layout
     * @return
     */
    @Transactional(readOnly = false)
    public Object changeWorkspaceLayout(@NotNull final UserWorkspace workspaceDetails) {
        final String workspacePositionToUpdate = workspaceDetails.getStructure();
        log.info("updating Workspace Layout to {}", workspacePositionToUpdate);
        final String inputLastModUser = workspaceDetails.getAuditData().getLastModifiedUserIdentifier();
        final String userId = validateUserId(inputLastModUser);
        workspaceDetails.getAuditData().setLastModifiedUserIdentifier(userId);
        final Integer currentWorkspaceId = workspaceDetails.getUserWorkspaceIdentifier();
        final List<UserWorkspaceAndWidgetDetail> workspaceAndWidgetsDetails = workspaceSupportQueriesDao
                .getWorkspaceAndWidgetSummaryForWorkspaceId(currentWorkspaceId);
        validateAndThrowExceptionWithMsg(CollectionUtils.isEmpty(workspaceAndWidgetsDetails),
                NO_WORKSPACE_WITH_ID_MSG_BGN + currentWorkspaceId + " found.", HttpStatus.BAD_REQUEST);
        final String currentWorkspaceLayout = workspaceAndWidgetsDetails.get(ZERO).getWorkspaceLayout();
        if (StringUtils.equals(StringUtils.trim(currentWorkspaceLayout), StringUtils.trim(workspacePositionToUpdate))) {
            return fetchUserWorkspaceDetailsByUserIdOrWorkspaceId(null, workspaceDetails.getUserWorkspaceIdentifier());
        }
        final String currentWorkspaceName = workspaceAndWidgetsDetails.get(ZERO).getWorkspaceName();
        if (StringUtils.isBlank(workspaceDetails.getUserWorkspaceName())) {
            workspaceDetails.setUserWorkspaceName(currentWorkspaceName);
        }
        final Map<Integer, String> mapByIdentifier = new HashMap<>();
        final Map<String, Integer> mapByOrder = new HashMap<>();
        generateMapByWidgetIdAndOrder(mapByIdentifier, mapByOrder, workspaceAndWidgetsDetails);
        if (MapUtils.isNotEmpty(mapByOrder)) {
            final Map<String, Map<Integer, String>> zoneKeyAndLayoutConfigMap = new HashMap<>();
            fetchAndBuildZoneKeyLayoutConfigMap(workspacePositionToUpdate, currentWorkspaceLayout,
                    zoneKeyAndLayoutConfigMap);
            final Map<Integer, String> currentZoneKeyLikeConfigMap = zoneKeyAndLayoutConfigMap.get(currentWorkspaceLayout);
            final Map<Integer, String> updatedZoneKeyLikeConfigMap = zoneKeyAndLayoutConfigMap
                    .get(workspacePositionToUpdate);
            final Map<Integer, String> defaultZoneNumberMap = zoneKeyAndLayoutConfigMap
                    .get(workspacePositionToUpdate + DEFAULT_ZONE_KEY_END);
            int defaultZoneNumber = 0;
            if (MapUtils.isNotEmpty(defaultZoneNumberMap)) {
                defaultZoneNumber = defaultZoneNumberMap.keySet().iterator().next().intValue();
            }
            final Map<Integer, List<String>> currentZoneNumberAndPositionsMap = new HashMap<>();
            mapWidgetsOfWorkspacesToZoneNumbers(mapByIdentifier, currentZoneNumberAndPositionsMap,
                    currentZoneKeyLikeConfigMap);
            if (MapUtils.isNotEmpty(updatedZoneKeyLikeConfigMap)) {
                final Map<Double, List<String>> updatedZoneNumberAndPositionsMap = new HashMap<>();
                sortThWidgetsIntoNewLayoutsZones(updatedZoneKeyLikeConfigMap, currentZoneNumberAndPositionsMap,
                        updatedZoneNumberAndPositionsMap, defaultZoneNumber);
                final Map<Double, List<String>> sortedZonePositionMap = new TreeMap<>(updatedZoneNumberAndPositionsMap);
                final Map<Double, Map<String, UserWorkspaceWidget>> toBeSortedAndReorderedMap = new HashMap<>();
                final Map<BigDecimal, String> widgetIdAndPositionToUpdateMap = new HashMap<>();
                final int maxOrderForFirstZone = repositionWidgetsinCommonZonesAndMapRemaining(mapByIdentifier,
                        updatedZoneKeyLikeConfigMap, sortedZonePositionMap, toBeSortedAndReorderedMap,
                        widgetIdAndPositionToUpdateMap, defaultZoneNumber);
                nonExistentZonesWidgetsPositionHelper(updatedZoneKeyLikeConfigMap, toBeSortedAndReorderedMap,
                        widgetIdAndPositionToUpdateMap, maxOrderForFirstZone);

                for (final Map.Entry<BigDecimal, String> eachWidgetPositionMapEntry : widgetIdAndPositionToUpdateMap
                        .entrySet()) {
                    final BigDecimal currentWidgetId = eachWidgetPositionMapEntry.getKey();
                    final String currentWidgetsPosition = eachWidgetPositionMapEntry.getValue();
                    final int positionUpdateStatus = userWorkspaceWidgetDao.updateWidgetPosition(currentWidgetId,
                            currentWidgetsPosition, workspaceDetails.getAuditData().getLastModifiedUserIdentifier());
                    log.info("Update of the widget with id " + currentWorkspaceId + "'s position to "
                            + currentWidgetsPosition + (positionUpdateStatus > ZERO ? "was successful" : "failed"));
                }
            }
        }
        final int workspacePositionUpdateStatus = userWorkspaceDao.updateWorkspacePosition(workspaceDetails);
        log.info(workspacePositionUpdateStatus > ZERO ? "Successfully updated layout" : "Failed to update layout");
        workspaceDetails.getAuditData().setLastModifiedUserIdentifier(inputLastModUser);
        return fetchUserWorkspaceDetailsByUserIdOrWorkspaceId(null, workspaceDetails.getUserWorkspaceIdentifier());
    }

    /**
     * This method helps in deleting a widget
     *
     * @param widgetId - Widget identifier
     */
    @Transactional(readOnly = false)
    public void deleteWorkspace(@NotNull final String workspaceId) {
        log.info("Deleting the widget having the widget id - {}", workspaceId);
        final boolean workspaceExists = userWorkspaceWidgetDao.checkIfExistsGeneric(NumberUtils.toInt(workspaceId), null,
                null, CHECK_IF_WORKSPACE_EXISTS);
        validateAndThrowExceptionWithMsg(!workspaceExists, NO_WORKSPACE_WITH_ID_MSG_BGN + workspaceId + " found to delete.",
                HttpStatus.BAD_REQUEST);
        final List<Map<String, Object>> existingWorkspaces = userWorkspaceDao.fetchAllWorkspacesForThisUser(workspaceId);
        final Integer workspaceIdOfTheNewDefault = checkIfThisIsDefault(existingWorkspaces, workspaceId);
        int deleteStatus = userWorkspaceWidgetDao.deleteWidgetByWorkspaceId(workspaceId);
        log.info("Deleted {} widgets associated to workspace id {} ", deleteStatus, workspaceId);
        deleteStatus = userWorkspaceDao.deleteWorkspace(workspaceId);
        validateAndThrowExceptionWithMsg(deleteStatus <= ZERO,
                "No Workspace with id " + workspaceId + MSG_END_FOUND_TO_DELETE, HttpStatus.BAD_REQUEST);
        if (null != workspaceIdOfTheNewDefault) {
            log.info("Making the workspace {} default as the current default workspace {} is deleted",
                    workspaceIdOfTheNewDefault.intValue(), workspaceId);
            final int updateStatus = userWorkspaceDao.makeThisWorkspaceDefault(workspaceIdOfTheNewDefault);
            validateAndThrowExceptionWithMsg(updateStatus <= ZERO,
                    "Failed to set the default Indicator for  " + workspaceIdOfTheNewDefault, HttpStatus.BAD_REQUEST);
        }

    }

    /**
     * This method is used to create a Workspace
     *
     * @param workspaceDetails - Details of the workspace to be created
     * @return
     */
    @Transactional(readOnly = false)
    public UserWorkspace createWorkspace(@NotNull final UserWorkspace workspaceDetails) {
        validateAndThrowExceptionWithMsg(StringUtils.isBlank(workspaceDetails.getUserWorkspaceName()),
                "userWorkspaceName cannot be blank or empty", HttpStatus.BAD_REQUEST);
        final String inputLastModUser = workspaceDetails.getAuditData().getLastModifiedUserIdentifier();
        final String userId = validateUserId(inputLastModUser);
        final boolean workspaceNameExists = userWorkspaceWidgetDao.checkIfExistsGeneric(NumberUtils.createBigDecimal(userId),
                StringUtils.upperCase(StringUtils.trim(workspaceDetails.getUserWorkspaceName())), null,
                "checkIfWorkspaceNameExists");
        validateAndThrowExceptionWithMsg(workspaceNameExists, "Workspace with name "
                + workspaceDetails.getUserWorkspaceName() + " already exists for this user. Please enter a different name",
                HttpStatus.BAD_REQUEST);
        workspaceDetails.getAuditData().setLastModifiedUserIdentifier(userId);
        final int noOfCurrentWorkspacesForThisUser = userWorkspaceDao.countOfWorkspaces(userId);
        validateAndThrowExceptionWithMsg(noOfCurrentWorkspacesForThisUser >= maxNoOfWorkspacesAllowed,
                "A user cannot have more than " + maxNoOfWorkspacesAllowed + " workspaces", HttpStatus.BAD_REQUEST);
        workspaceDetails.setUserWorkspaceName(StringUtils.trim(workspaceDetails.getUserWorkspaceName()));
        final int insertCount = userWorkspaceDao.addWorkspace(workspaceDetails);
        validateAndThrowExceptionWithMsg(insertCount <= ZERO, "Failed to create workspace", HttpStatus.BAD_REQUEST);
        workspaceDetails.getAuditData().setLastModifiedUserIdentifier(inputLastModUser);
        return workspaceDetails;
    }

    /**
     * This method is used to update a Workspace
     *
     * @param workspaceDetails - Details of the workspace to be updated
     * @return
     */
    @Transactional(readOnly = false)
    public Object updateWorkspace(@NotNull final UserWorkspace workspaceDetails) {
        validateAndThrowExceptionWithMsg(StringUtils.isBlank(workspaceDetails.getUserWorkspaceName()),
                "userWorkspaceName cannot be blank or empty", HttpStatus.BAD_REQUEST);
        validateConditionAndThrowExceptionStatus(null == workspaceDetails.getUserWorkspaceIdentifier(),
                "wrkspc.id.reqd.for.update", HttpStatus.BAD_REQUEST);
        final boolean workspaceExists = userWorkspaceWidgetDao.checkIfExistsGeneric(
                BigDecimal.valueOf(workspaceDetails.getUserWorkspaceIdentifier()), null, null, CHECK_IF_WORKSPACE_EXISTS);
        validateAndThrowExceptionWithMsg(!workspaceExists,
                NO_WORKSPACE_WITH_ID_MSG_BGN + workspaceDetails.getUserWorkspaceIdentifier() + " found to update.",
                HttpStatus.BAD_REQUEST);
        final String inputLastModUser = workspaceDetails.getAuditData().getLastModifiedUserIdentifier();
        final String userId = validateUserId(inputLastModUser);
        final boolean workspaceNameExists = userWorkspaceWidgetDao.checkIfExistsGeneric(NumberUtils.createBigDecimal(userId),
                StringUtils.upperCase(StringUtils.trim(workspaceDetails.getUserWorkspaceName())),
                BigDecimal.valueOf(workspaceDetails.getUserWorkspaceIdentifier()),
                "checkIfWorkspaceNameExistsExceptInCurrentWorkspace");
        validateAndThrowExceptionWithMsg(workspaceNameExists, "Workspace with name "
                + workspaceDetails.getUserWorkspaceName() + " already exists for this user. Please enter a different name",
                HttpStatus.BAD_REQUEST);
        workspaceDetails.getAuditData().setLastModifiedUserIdentifier(userId);
        final boolean orderChanged = null != workspaceDetails.getNewWorkspaceOrderNumber()
                && !workspaceDetails.getNewWorkspaceOrderNumber().equals(workspaceDetails.getCurrentWorkspaceOrderNumber());
        if (orderChanged) {
            final int orderUpdateCount = userWorkspaceDao.updateWorkspaceOrders(workspaceDetails);
            validateAndThrowExceptionWithMsg(orderUpdateCount < ZERO,
                    "Failed to update workspace orders with workspace id - " + workspaceDetails.getUserWorkspaceIdentifier(),
                    HttpStatus.BAD_REQUEST);
        }
        if (workspaceDetails.isDefaultIndicator()) {
            final int orderUpdateCount = userWorkspaceDao.makeOtherWorkspacesNonDefault(workspaceDetails);
            log.info("Updated Default Indicators to no for " + orderUpdateCount + " workspaces belonging to user "
                    + inputLastModUser);
        }
        workspaceDetails.setUserWorkspaceName(
                StringUtils.replace(workspaceDetails.getUserWorkspaceName(), NON_BREAKING_SPACE_STR, EMPTY_STR));
        workspaceDetails.setUserWorkspaceName(StringUtils.trim(workspaceDetails.getUserWorkspaceName()));
        final int updateCount = userWorkspaceDao.updateWorkspace(workspaceDetails);
        validateAndThrowExceptionWithMsg(updateCount <= ZERO,
                "Failed to update workspace with workspace id - " + workspaceDetails.getUserWorkspaceIdentifier(),
                HttpStatus.BAD_REQUEST);
        workspaceDetails.getAuditData().setLastModifiedUserIdentifier(inputLastModUser);
        return fetchUserWorkspaceDetailsByUserIdOrWorkspaceId(null, workspaceDetails.getUserWorkspaceIdentifier());
    }

    /**
     * This method is used to create multiple workspace widgets in a workspace
     *
     * @param workspaceWidgets -List of widget details to be created
     * @return
     */
    @Transactional(readOnly = false)
    public List<UserWorkspaceWidget> createWidgetsInBulk(final List<UserWorkspaceWidget> workspaceWidgets) {
        final String inputLastModUser = workspaceWidgets.get(0).getAuditData().getLastModifiedUserIdentifier();
        final String userId = validateUserId(inputLastModUser);
        for (final UserWorkspaceWidget eachWorkspaceWidget : workspaceWidgets) {
            eachWorkspaceWidget.getAuditData().setLastModifiedUserIdentifier(userId);
            createWidgetHelper(eachWorkspaceWidget, inputLastModUser, false, inputLastModUser);
           
        }
        return workspaceWidgets;
    }

    /**
     * This method is used to create the workspace widget
     *
     * @param workspaceWidget - Workspace widget details needed to create a widget
     * @return
     */
    @Transactional(readOnly = false)
    public UserWorkspaceWidget createWidget(final UserWorkspaceWidget workspaceWidget) {
        final String inputLastModUser = workspaceWidget.getAuditData().getLastModifiedUserIdentifier();
        final String userId = validateUserId(inputLastModUser);
        workspaceWidget.getAuditData().setLastModifiedUserIdentifier(userId);
        createWidgetHelper(workspaceWidget, inputLastModUser, false, inputLastModUser);
        
        return workspaceWidget;
    }

    /**
     * This method is used to copy the workspace widget from one workspace to another
     *
     * @param workspaceWidget - Workspace widget details needed to copy a widget
     * @return
     */
    @Transactional(readOnly = false)
    public UserWorkspaceWidget copyWidget(final UserWorkspaceWidget workspaceWidget) {
        final String inputLastModUser = workspaceWidget.getAuditData().getLastModifiedUserIdentifier();
        final String userId = validateUserId(inputLastModUser);
        workspaceWidget.getAuditData().setLastModifiedUserIdentifier(userId);
        final Integer destinationWorkspaceId = workspaceWidget.getUserWorkspaceData().getUserWorkspaceIdentifier();
        final Integer idOfTheWidgetToBeCopied = workspaceWidget.getUserWorkspaceWidgetIdentifier();
        final UserWorkspaceAndWidgetDetail fromWidgetDetails = userWorkspaceWidgetDao
                .fetchWidgetDetailsByWidgetId(idOfTheWidgetToBeCopied, destinationWorkspaceId);
        validateAndThrowExceptionWithMsg(null == fromWidgetDetails,
                "Widget with id " + workspaceWidget.getUserWorkspaceWidgetIdentifier() + " not found",
                HttpStatus.BAD_REQUEST);
        if (null != fromWidgetDetails) {
            validateAndThrowExceptionWithMsg(null == fromWidgetDetails.getWorkspaceIdentifier(),
                    "No destination workspace with id " + destinationWorkspaceId + " found to copy the widgets to",
                    HttpStatus.BAD_REQUEST);
            final String currentUserId = workspaceWidget.getAuditData().getCreateUserIdentifier();
            validateAndThrowExceptionWithMsg(!StringUtils.equals(currentUserId, fromWidgetDetails.getWorkspaceUserId()),
                    "The input workspace does not belong to " + currentUserId + ", hence the widget with id "
                            + idOfTheWidgetToBeCopied + " cannot be copied over to the workspace with id "
                            + destinationWorkspaceId,
                    HttpStatus.BAD_REQUEST);
            final UserWorkspaceWidget widgetDetailsToBeCopied = new UserWorkspaceWidget();
            widgetDetailsToBeCopied.setAuditData(workspaceWidget.getAuditData());
            widgetDetailsToBeCopied.setConfigText(fromWidgetDetails.getWidgetConfigurationText());
            widgetDetailsToBeCopied.setDataUrlText(fromWidgetDetails.getDataUrlText());
            final UserWorkspaceSummary userWorkspaceSummary = new UserWorkspaceSummary();
            userWorkspaceSummary.setUserWorkspaceIdentifier(destinationWorkspaceId);
            widgetDetailsToBeCopied.setUserWorkspaceData(userWorkspaceSummary);
            widgetDetailsToBeCopied.setWidgetColor(fromWidgetDetails.getWidgetColor());
            widgetDetailsToBeCopied.setWidgetCustomName(fromWidgetDetails.getWidgetName());
            final StandardWidgetSummary stndWidgetSummary = new StandardWidgetSummary();
            stndWidgetSummary.setWidgetIdentifier(fromWidgetDetails.getStndWidgetIdentifier().intValue());
            widgetDetailsToBeCopied.setWidgetData(stndWidgetSummary);
            widgetDetailsToBeCopied.setWidgetPositionText(workspaceWidget.getWidgetPositionText());

            widgetDetailsToBeCopied.setWidgetHeightPixelQuality(String.valueOf(fromWidgetDetails.getWidgetHeight()));
            final UserWorkspaceWidget createdWidget = createWidgetHelper(widgetDetailsToBeCopied, inputLastModUser, true,
                    inputLastModUser);
            copyColumnsDataFromSourceToDestinationWidget(createdWidget, workspaceWidget.getUserWorkspaceWidgetIdentifier());

            if (null != workspaceWidget.getDeleteAfterCopy() && workspaceWidget.getDeleteAfterCopy()) {
                deleteWidget(idOfTheWidgetToBeCopied.toString());
            }
            createdWidget.setCopyFavorites(null);
            return createdWidget;
        }
        return workspaceWidget;
    }

    /**
     * method to copy columns data from source to destination
     */
    private void copyColumnsDataFromSourceToDestinationWidget(final UserWorkspaceWidget createdWidget,
            final Integer userWorkspaceWidgetIdentifier) {
        final Object columnData = userWorkspaceWidgetDao
                .getSelectedColumnListDocForWorkspaceWidgetId(userWorkspaceWidgetIdentifier);
        if (null != columnData) {
            userWorkspaceWidgetDao.updateColumnListDocForWorkspaceWidgetId(userWorkspaceWidgetIdentifier,
                    createdWidget.getUserWorkspaceWidgetIdentifier());
            createdWidget.setSelectedColumnsAsStr(convertObjectToString(columnData));
        }

    }

    /**
     * This method is used to create the workspace widget
     *
     * @param workspaceWidget - Workspace widget details needed to create a widget
     * @return
     */
    @Transactional(readOnly = false)
    public UserWorkspaceWidget updateWidget(final UserWorkspaceWidget workspaceWidget) {
        workspaceWidget.setWidgetCustomName(
                StringUtils.replaceAll(workspaceWidget.getWidgetCustomName(), NON_BREAKING_SPACE_STR, EMPTY_STR));
        validateAndThrowExceptionWithMsg(
                StringUtils.isBlank(workspaceWidget.getWidgetCustomName())
                        || workspaceWidget.getWidgetCustomName().length() > MAX_LENGTH_OF_WIDGET_NAME_ALLOWED,
                "widgetCustomName must be between 1 and 200 characters", HttpStatus.BAD_REQUEST);
        final String inputLastModUser = workspaceWidget.getAuditData().getLastModifiedUserIdentifier();
        final String userId = validateUserId(inputLastModUser);
        final List<UserWorkspaceAndWidgetDetail> availableWidgetDetails = workspaceSupportQueriesDao
                .fetchAllWidgetsForThisWorkspace(workspaceWidget.getUserWorkspaceData().getUserWorkspaceIdentifier());
        final Map<Integer, String> mapByIdentifier = new HashMap<>();
        final Map<String, Integer> mapByOrder = new HashMap<>();
        generateMapByWidgetIdAndOrder(mapByIdentifier, mapByOrder, availableWidgetDetails);
        final boolean widgetExists = mapByIdentifier.containsKey(workspaceWidget.getUserWorkspaceWidgetIdentifier());
        validateAndThrowExceptionWithMsg(!widgetExists,
                "No widget with id " + workspaceWidget.getUserWorkspaceWidgetIdentifier() + " found to update.",
                HttpStatus.BAD_REQUEST);
        final boolean widgetNameExists = userWorkspaceWidgetDao.checkIfExistsGeneric(
                BigDecimal.valueOf(workspaceWidget.getUserWorkspaceData().getUserWorkspaceIdentifier()),
                StringUtils.upperCase(StringUtils.trim(workspaceWidget.getWidgetCustomName())),
                BigDecimal.valueOf(workspaceWidget.getUserWorkspaceWidgetIdentifier()),
                "checkIfWidgetNameExistsExceptInCurrentWidget");
        validateAndThrowExceptionWithMsg(widgetNameExists,
                WIDGET_ALREADY_EXISTS_MSG_BGN + workspaceWidget.getWidgetCustomName() + WIDGET_ALREADY_EXISTS_MSG_END,
                HttpStatus.BAD_REQUEST);
        workspaceWidget.getAuditData().setLastModifiedUserIdentifier(userId);
        final String currentPositionText = StringUtils
                .trim(mapByIdentifier.get(workspaceWidget.getUserWorkspaceWidgetIdentifier()));
        final String updatedPositionText = StringUtils.trim(workspaceWidget.getWidgetPositionText());
        if (!StringUtils.equals(currentPositionText, updatedPositionText)) {
            final String[] currentPositionsArray = StringUtils.splitByWholeSeparator(currentPositionText,
                    SEPARATOR_DOUBLE_PIPE);
            final String[] updatedPositionsArray = StringUtils.splitByWholeSeparator(updatedPositionText,
                    SEPARATOR_DOUBLE_PIPE);
            final boolean rowChanged = !StringUtils.equals(currentPositionsArray[ZERO], updatedPositionsArray[ZERO]);
            final boolean columnChanged = !StringUtils.equals(currentPositionsArray[ONE], updatedPositionsArray[ONE]);
            final int currOrder = NumberUtils.toInt(currentPositionsArray[TWO]);
            final int updatedOrder = NumberUtils.toInt(updatedPositionsArray[TWO]);
            final boolean positionIncreased = updatedOrder > currOrder;
            final String keyLikeForFirstSetOfUpdates = currentPositionsArray[ZERO] + SEPARATOR_DOUBLE_PIPE
                    + currentPositionsArray[1] + SEPARATOR_DOUBLE_PIPE;
            boolean conditionToCheckBeforeAddingCurrentWidget = !rowChanged && !columnChanged;
            final Map<Integer, String> sortedMapFirst = calculateAndGetNewPositions(workspaceWidget, mapByIdentifier,
                    updatedPositionText, conditionToCheckBeforeAddingCurrentWidget, keyLikeForFirstSetOfUpdates,
                    positionIncreased);
            Map<Integer, String> sortedMapSecond = null;
            if (!sortedMapFirst.containsKey(workspaceWidget.getUserWorkspaceWidgetIdentifier())) {
                conditionToCheckBeforeAddingCurrentWidget = rowChanged || columnChanged;
                final String keyLikeForSecondSetOfUpdates = updatedPositionsArray[ZERO] + SEPARATOR_DOUBLE_PIPE
                        + updatedPositionsArray[1] + SEPARATOR_DOUBLE_PIPE;
                sortedMapSecond = calculateAndGetNewPositions(workspaceWidget, mapByIdentifier, updatedPositionText,
                        conditionToCheckBeforeAddingCurrentWidget, keyLikeForSecondSetOfUpdates, positionIncreased);
            }
            final String finalPositionIfOnlyRowChanged = updateWidgetPositionsOfOthersAndGetPositionOfCurrent(sortedMapFirst,
                    mapByIdentifier, workspaceWidget);
            final String finalPositionIfRowOfColumnChanged = null;
            updateWidgetHelper(workspaceWidget, mapByIdentifier, sortedMapSecond, finalPositionIfOnlyRowChanged,
                    finalPositionIfRowOfColumnChanged);
        }
        workspaceWidget.setWidgetCustomName(StringUtils.trim(workspaceWidget.getWidgetCustomName()));
        final int updateCount = userWorkspaceWidgetDao.updateWidget(workspaceWidget);
        validateAndThrowExceptionWithMsg(updateCount <= ZERO, "Failed to Update widget", HttpStatus.BAD_REQUEST);
        workspaceWidget.getAuditData().setLastModifiedUserIdentifier(inputLastModUser);
        addZoneWidthDetails(workspaceWidget);
        return workspaceWidget;
    }

    /**
     * This method is used to update the workspace orders in bulk
     *
     * @param workspaces - List of workspaces with new orders
     * @return
     */
    @Transactional(readOnly = false)
    public UserWorkspaceAndWidgetsInformation updateWorkspaceOrdersInBulk(final List<UserWorkspace> workspaces) {
        final String userId = validateUserId(workspaces.get(ZERO).getAuditData().getLastModifiedUserIdentifier());
        for (final UserWorkspace eachWorkspace : workspaces) {
            final int updateStatus = userWorkspaceDao.updateWorkspaceOrderOnly(eachWorkspace, userId);
            validateAndThrowExceptionWithMsg(updateStatus <= 0,
                    "Workspace with id " + eachWorkspace.getUserWorkspaceIdentifier() + " failed to update.",
                    HttpStatus.BAD_REQUEST);
        }
        return fetchUserWorkspaceDetailsByUserIdOrWorkspaceId(userId, null);
    }

    /**
     * This method helps updateWidget() in setting the widget position
     */
    private void updateWidgetHelper(final UserWorkspaceWidget workspaceWidget, final Map<Integer, String> mapByIdentifier,
            final Map<Integer, String> sortedMapSecond, final String finalPositionIfOnlyRowChanged,
            final String finalPositionIfRowOfColumnChanged) {
        String finalPositionIfRowOfColumnChangedLocal = finalPositionIfRowOfColumnChanged;
        if (null != sortedMapSecond && MapUtils.isNotEmpty(sortedMapSecond)) {
            finalPositionIfRowOfColumnChangedLocal = updateWidgetPositionsOfOthersAndGetPositionOfCurrent(sortedMapSecond,
                    mapByIdentifier, workspaceWidget);
        }
        if (StringUtils.isNotBlank(finalPositionIfOnlyRowChanged)
                || StringUtils.isNotBlank(finalPositionIfRowOfColumnChangedLocal)) {
            workspaceWidget.setWidgetPositionText(StringUtils.isNotBlank(finalPositionIfOnlyRowChanged)
                    ? finalPositionIfOnlyRowChanged : finalPositionIfRowOfColumnChangedLocal);
        }
    }

    /**
     * This method is used to build and add the widget details to the widgetDetails list
     */
    private void populateWidgetDetails(final UserWorkspace workspace,
            final UserWorkspaceAndWidgetDetail eachWorkspaceAndWidgetDetail) {
        if (null != eachWorkspaceAndWidgetDetail.getWidgetIdentifier()) {
            final UserWorkspaceWidget widgetDetail = new UserWorkspaceWidget();
            widgetDetail.setUserWorkspaceWidgetIdentifier(eachWorkspaceAndWidgetDetail.getWidgetIdentifier().intValue());
            widgetDetail.setWidgetColor(eachWorkspaceAndWidgetDetail.getWidgetColor());
            widgetDetail.setConfigText(eachWorkspaceAndWidgetDetail.getWidgetConfigurationText());
            widgetDetail.setWidgetHeightPixelQuality(StringUtils.trim(eachWorkspaceAndWidgetDetail.getWidgetHeight()));
            widgetDetail.setDataUrlText(eachWorkspaceAndWidgetDetail.getDataUrlText());
            final StandardViewLayout viewLayout = new StandardViewLayout();
            viewLayout.setDescriptionText(eachWorkspaceAndWidgetDetail.getWidgetDescription());
            widgetDetail.setViewLayoutData(viewLayout);
            final StandardWidgetSummary widgetData = new StandardWidgetSummary();
            widgetData.setWidgetIdentifier(eachWorkspaceAndWidgetDetail.getStndWidgetIdentifier().intValue());
            widgetData.setWidgetName(eachWorkspaceAndWidgetDetail.getWidgetStndName());
            widgetDetail.setWidgetData(widgetData);
            widgetDetail.setWidgetPositionText(eachWorkspaceAndWidgetDetail.getWidgetPosition());
            widgetDetail.setWidgetCustomName(
                    StringUtils.replaceAll(eachWorkspaceAndWidgetDetail.getWidgetName(), EMPTY_STR, NON_BREAKING_SPACE_STR));
            final String zoneConfig = StringUtils.substring(widgetDetail.getWidgetPositionText(), ZERO,
                    widgetDetail.getWidgetPositionText().lastIndexOf(PIPE_CHAR) - ONE);
            addZoneWidthDetailsHelper(widgetDetail, zoneConfig, workspace.getStructure(),
                    eachWorkspaceAndWidgetDetail.getWorkspaceStructureMapping());
            if (null != workspace.getUserWorkspaceWidgetsData()) {
                workspace.getUserWorkspaceWidgetsData().add(widgetDetail);
            } else {
                final List<UserWorkspaceWidget> widgetsDetails = new ArrayList<>();
                widgetsDetails.add(widgetDetail);
                workspace.setUserWorkspaceWidgetsData(widgetsDetails);
            }
        }
    }

    /**
     * This method positions the widgets that falls back on the default zone
     */
    private void nonExistentZonesWidgetsPositionHelper(final Map<Integer, String> updatedZoneKeyLikeConfigMap,
            final Map<Double, Map<String, UserWorkspaceWidget>> toBeSortedAndReorderedMap,
            final Map<BigDecimal, String> widgetIdAndPositionToUpdateMap, final int maxOrderForFirstZone) {
        int maxOrderForFirstZoneLocal = maxOrderForFirstZone;
        final Map<Double, Map<String, UserWorkspaceWidget>> preSortedToBeSortedMap = new TreeMap<>(
                toBeSortedAndReorderedMap);
        for (final Map.Entry<Double, Map<String, UserWorkspaceWidget>> eachToBeSortedMapEntry : preSortedToBeSortedMap
                .entrySet()) {
            final List<UserWorkspaceWidget> sortedWidgetsForThisZone = sortWidgetByPositionsText(
                    eachToBeSortedMapEntry.getValue());
            String keyLikeStr = updatedZoneKeyLikeConfigMap.get(eachToBeSortedMapEntry.getKey().intValue());
            keyLikeStr = keyLikeStr.replaceAll(HYPHEN, SEPARATOR_DOUBLE_PIPE);
            for (final UserWorkspaceWidget eachSortedWidget : sortedWidgetsForThisZone) {
                maxOrderForFirstZoneLocal = maxOrderForFirstZoneLocal + ONE;
                final String position = keyLikeStr + maxOrderForFirstZoneLocal;
                widgetIdAndPositionToUpdateMap.put(BigDecimal.valueOf(eachSortedWidget.getUserWorkspaceWidgetIdentifier()),
                        position);
            }
        }
    }

    /**
     * This method is used to iterate through the workspace map and sort them by their order numbers
     */
    private void iterateAndSortWorkspacesByOrder(final Map<Integer, UserWorkspace> workspaceMap,
            final Map<Integer, List<UserWorkspace>> workspaceSorted) {
        for (final Map.Entry<Integer, UserWorkspace> eachEntry : workspaceMap.entrySet()) {
            final int currentOrder = eachEntry.getValue().getCurrentWorkspaceOrderNumber();
            if (workspaceSorted.containsKey(currentOrder)) {
                workspaceSorted.get(currentOrder).add(eachEntry.getValue());
            } else {
                final List<UserWorkspace> workspacesToAdd = new ArrayList<>();
                workspacesToAdd.add(eachEntry.getValue());
                workspaceSorted.put(currentOrder, workspacesToAdd);
            }
        }
    }

    /**
     * This method repositions the widgets in common zones and creates a new map of the fall back widgets
     */
    private int repositionWidgetsinCommonZonesAndMapRemaining(final Map<Integer, String> mapByIdentifier,
            final Map<Integer, String> updatedZoneKeyLikeConfigMap, final Map<Double, List<String>> sortedZonePositionMap,
            final Map<Double, Map<String, UserWorkspaceWidget>> toBeSortedAndReorderedMap,
            final Map<BigDecimal, String> widgetIdAndPositionToUpdateMap, final int defaultZoneNumber) {
        int maxOrderForFirstZone = ZERO;
        for (final Map.Entry<Double, List<String>> eachSortedZonePositionMapEntry : sortedZonePositionMap.entrySet()) {
            final Double zone = eachSortedZonePositionMapEntry.getKey();
            final Long zoneAsLong = zone.longValue();
            final boolean zoneExistsInBothOldAndNewLayout = zone.compareTo(zoneAsLong.doubleValue()) == ZERO;
            final List<String> positionsList = eachSortedZonePositionMapEntry.getValue();
            String keyLikeStr = updatedZoneKeyLikeConfigMap.get(zone.intValue());
            keyLikeStr = keyLikeStr.replaceAll(HYPHEN, SEPARATOR_DOUBLE_PIPE);
            if (zoneExistsInBothOldAndNewLayout) {
                for (final String eachPosition : positionsList) {
                    final String[] widgetIdPositionArray = eachPosition.split(TILDA);
                    final String widgetId = widgetIdPositionArray[ZERO];
                    final String widgetPosition = widgetIdPositionArray[ONE];

                    final String order = widgetPosition.substring(widgetPosition.lastIndexOf(PIPE_CHAR) + ONE);
                    final int orderNumber = NumberUtils.toInt(order);
                    maxOrderForFirstZone = zone.intValue() == defaultZoneNumber && orderNumber > maxOrderForFirstZone
                            ? orderNumber : maxOrderForFirstZone;
                    commonZoneWidgetsPositionHelper(mapByIdentifier, widgetIdAndPositionToUpdateMap, keyLikeStr, widgetId,
                            order);
                }
            } else {
                nonExistentZonesMapHelper(toBeSortedAndReorderedMap, zone, positionsList);
            }
        }
        return maxOrderForFirstZone;
    }

    /**
     * This used to give new position numbers to the widget in new layout's zone which is same as zone in the old layout
     */
    private void commonZoneWidgetsPositionHelper(final Map<Integer, String> mapByIdentifier,
            final Map<BigDecimal, String> widgetIdAndPositionToUpdateMap, final String keyLikeStr, final String widgetId,
            final String order) {
        final BigDecimal widgetIdAsBigDecimal = NumberUtils.createBigDecimal(widgetId);
        final String widgetPositionInTheOldLayout = mapByIdentifier.get(widgetIdAsBigDecimal.intValue());
        if (!widgetPositionInTheOldLayout.startsWith(keyLikeStr)) {
            final String finalPosition = keyLikeStr + order;
            widgetIdAndPositionToUpdateMap.put(widgetIdAsBigDecimal, finalPosition);
        }
    }

    /**
     * This method fetches the workspace default settings
     *
     * @return
     */
    private List<Map<String, String>> fetchDefaultSettingsForWorkSpaces() {
        final Map<String, String> mapPair = new ConcurrentHashMap<>();
        mapPair.put("MAX_NO_OF_WORKSPACES_ALLOWED", "maximumNumberOfWorkspacesAllowed");
        mapPair.put("MAX_WORKSPACE_TITLE_LENGTH", "maximumWorkspaceTitleLengthAllowed");

        final List<String> listTypeCd = new ArrayList<>(mapPair.keySet());
        final List<CodeReferenceLookup> listCodeReferenceEntity = codeReferenceDao
                .fetchCodeReferenceByTypeCodeIn(listTypeCd);

        final List<Map<String, String>> listMapKeyValue = new ArrayList<>();

        if (CollectionUtils.isNotEmpty(listCodeReferenceEntity)) {
            for (final CodeReferenceLookup codeReferenceEntity : listCodeReferenceEntity) {
                final Map<String, String> map = new ConcurrentHashMap<>();
                map.put("key", mapPair.get(codeReferenceEntity.getTypeCode()));
                map.put("val", codeReferenceEntity.getValueText());
                listMapKeyValue.add(map);
            }
        }
        return listMapKeyValue;
    }

}
