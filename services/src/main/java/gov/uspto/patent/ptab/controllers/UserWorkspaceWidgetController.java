package gov.uspto.patent.ptab.controllers;

import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import gov.uspto.patent.ptab.domain.StandardWidget;
import gov.uspto.patent.ptab.domain.UserWorkspaceAndWidgetsInformation;
import gov.uspto.patent.ptab.domain.UserWorkspaceWidget;
import gov.uspto.patent.ptab.domain.WidgetsByZones;
import gov.uspto.patent.ptab.helper.WidgetDaoHelper;
import gov.uspto.patent.ptab.helper.WorkspaceDaoHelper;
import lombok.extern.slf4j.Slf4j;

/**
 * This class is used to handle REST calls for User Workspace Widgets.
 * 
 * @author 2020 development team
 */
@Slf4j
@RestController
public class UserWorkspaceWidgetController {

    @Autowired
    private WorkspaceDaoHelper workspaceDaoHelper;

    @Autowired
    private WidgetDaoHelper widgetDaoHelper;

    /**
     * This end point is used to fetch all the available standard widget definitions
     * 
     * @return
     */
    @GetMapping(value = "/widgets")
    public List<StandardWidget> fetchAllWidgets() {
        return workspaceDaoHelper.fetchStandardWidgets();
    }

    /**
     * This end point is used to add workspace
     * 
     * @param userWorkspaceWidget - request object to be processed
     * @return
     */
    @PostMapping(value = "/user-workspace-widgets")
    public UserWorkspaceWidget addWorkspace(@Valid @RequestBody final UserWorkspaceWidget userWorkspaceWidget) {
        log.info("Adding Widget ");
        return workspaceDaoHelper.createWidget(userWorkspaceWidget);
    }

    /**
     * This end point is used to add a new workspace
     * 
     * @param userWorkspaceWidgets - request object to be processed
     * @return
     */
    @PostMapping(value = "/user-workspace-widgets/bulk")
    public List<UserWorkspaceWidget> addWorkspace(
            @Valid @RequestBody final List<UserWorkspaceWidget> userWorkspaceWidgets) {
        log.info("Adding Widgets ");
        return workspaceDaoHelper.createWidgetsInBulk(userWorkspaceWidgets);
    }

    /**
     * This end point is used to copy widget
     * 
     * @param userWorkspaceWidget - request object to be processed
     * @return
     */
    @PostMapping(value = "/user-workspace-widgets/copy")
    public UserWorkspaceWidget copyWorkspaceWidget(@Valid @RequestBody final UserWorkspaceWidget userWorkspaceWidget) {
        log.info("Copying Widget ");
        return workspaceDaoHelper.copyWidget(userWorkspaceWidget);
    }

    /**
     * This end point is used to update workspace
     * 
     * @param userWorkspaceWidget - request object to be processed
     * @return
     */
    @PutMapping(value = "/user-workspace-widgets")
    public UserWorkspaceWidget updateWorkspace(@Valid @RequestBody final UserWorkspaceWidget userWorkspaceWidget) {
        log.info("Updating Widget settings");
        return workspaceDaoHelper.updateWidget(userWorkspaceWidget);
    }

    /**
     * This end point is used to delete user workspace
     * 
     * @param workspaceWidgetId - Unique identifier of the widget
     */
    @DeleteMapping(value = "/user-workspace-widgets/{workspaceWidgetId}")
    public void deleteUserWorkspace(@NotBlank @PathVariable("workspaceWidgetId") final String workspaceWidgetId) {
        log.info("Deleting the widget with id {}", workspaceWidgetId);
        workspaceDaoHelper.deleteWidget(workspaceWidgetId);
    }

    /**
     * This end point is used to fetch widgets for a given workspace, sort them and then split them by zones
     * 
     * @param workspaceId - Unique identifier of the workspace
     * @return
     */
    @GetMapping(value = "/user-workspace-widgets/by-zones/{workspaceId}")
    public WidgetsByZones getWidgetsAndSplitThemByZones(@NotBlank @PathVariable("workspaceId") final String workspaceId) {
        log.info("Fetching the widgets and their positions split into zones for workspace id {}", workspaceId);
        return widgetDaoHelper.fetchWidgetsForAWorkspaceAndSplitThemIntoZones(workspaceId);
    }

    /**
     * This method fetch widgets for a given workspace, sort them and tehn split them by zones
     * 
     * @param workspaceId - Unique identifier of the workspace
     */
    @PutMapping(value = "/user-workspace-widgets/by-zones/{workspaceId}")
    public UserWorkspaceAndWidgetsInformation updateWidgetsPositionsInBulk(
            @NotBlank @PathVariable("workspaceId") final String workspaceId,
            @Valid @RequestBody final WidgetsByZones widgetsByZones) {
        log.info("Updating widgets positions in bulk {}", workspaceId);
        return widgetDaoHelper.updateWidgetsPositionByZones(widgetsByZones);
    }

    /**
     * This method fetches the selected columns data for the input widget id
     * 
     * @param workspaceId - Unique identifier of the workspace
     */
    @GetMapping(value = "/user-workspace-widgets/columns/{widgetId}")
    public UserWorkspaceWidget fetchSelectedColumns(@NotBlank @PathVariable("widgetId") final String widgetId) {
        log.info("Fetching selected columns for widget {}", widgetId);
        return widgetDaoHelper.fetchSelectedColmuns(widgetId);
    }

    /**
     * This method fetches the selected columns data for the input widget id
     * 
     * @param workspaceId - Unique identifier of the workspace
     */
    @PutMapping(value = "/user-workspace-widgets/columns")
    public Object updateSelectedColumns(@Valid @RequestBody final UserWorkspaceWidget userWorkspaceWidget) {
        log.info("Fetching selected columns for widget {}", userWorkspaceWidget.getUserWorkspaceWidgetIdentifier());
        //return widgetDaoHelper.updateSelectedColmuns(userWorkspaceWidget);
        return null;
    }

}
