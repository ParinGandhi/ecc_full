package gov.uspto.patent.ptab.controllers;

import java.util.List;
import java.util.Map;

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

import gov.uspto.patent.ptab.domain.UserWorkspace;
import gov.uspto.patent.ptab.domain.UserWorkspaceAndWidgetsInformation;
import gov.uspto.patent.ptab.entities.support.UserWorkspaceQuery;
import gov.uspto.patent.ptab.helper.WorkspaceDaoHelper;
import gov.uspto.patent.ptab.utils.ErrorPayload;
import lombok.extern.slf4j.Slf4j;

/**
 * This class is used to handle REST calls for User Workspaces.
 *
 * @author 2020 development team
 */
@Slf4j
@RestController
public class UserWorkspaceController {

    @Autowired
    private WorkspaceDaoHelper workspaceDaoHelper;

    /**
     * This end point is used to fetch all the default settings for the workspaces screen
     *
     * @return
     */
    @GetMapping(value = "/user-workspaces/defaults")
    public Map<String, Object> getWorkspaceDefaults() {
        return workspaceDaoHelper.fetchWorkspaceDefaults();
    }

    /**
     * This end point is used to fetch all the workspaces and its containing widgets for a given user identifier
     *
     * @param loginId - Login identifier of a user
     * @return
     * @throws IOException
     */
    @GetMapping(value = "/user-workspaces")
    public UserWorkspaceAndWidgetsInformation getUserWorkspaces(final UserWorkspaceQuery userWorkspaceQuery) {
        return workspaceDaoHelper.fetchUserWorkspaceDetails(userWorkspaceQuery);
    }

    /**
     * This end point is used to create a user workspace
     *
     * @param userWorkspace - Workspace details to be created
     * @return
     */
    @PostMapping(value = "/user-workspaces")
    public UserWorkspace addWorkspace(@Valid @RequestBody final UserWorkspace userWorkspace) {
        log.info("Adding Workspace ");
        return workspaceDaoHelper.createWorkspace(userWorkspace);
    }

    /**
     * This end point is used to update details of an existing workspace
     *
     * @param userWorkspace - Workspace details to be updated
     * @return
     */
    @PutMapping(value = "/user-workspaces")
    public Object updateWorkspace(@Valid @RequestBody final UserWorkspace userWorkspace) {
        log.info("Updating workspace settings");

        return workspaceDaoHelper.updateWorkspace(userWorkspace);
    }

    /**
     * This end point is used to update layout/structure of an existing workspace
     *
     * @param userWorkspace - Workspace details to be updated
     * @return
     */
    @PutMapping(value = "/user-workspaces/layout")
    public Object updateWorkspaceStructure(@Valid @RequestBody final UserWorkspace userWorkspace) {
        log.info("Updating workspace structure");
        return workspaceDaoHelper.changeWorkspaceLayout(userWorkspace);
    }

    /**
     * This end point is used to update orders of an existing workspaces
     *
     * @param userWorkspace - Workspace order to be updated
     * @return
     */
    @PutMapping(value = "/user-workspaces/order")
    public Object updateWorkspaceOrders(@Valid @RequestBody final List<UserWorkspace> userWorkspaces) {
        log.info("Updating workspace orders in bulk");
        return workspaceDaoHelper.updateWorkspaceOrdersInBulk(userWorkspaces);
    }

    /**
     * This end point is used to delete a workspace
     *
     * @param userWorkspaceId - Unique workspace identifier
     * @return
     */
    @DeleteMapping(value = "/user-workspaces/{userWorkspaceId}")
    public ErrorPayload deleteUserWorkspace(@NotBlank @PathVariable("userWorkspaceId") final String userWorkspaceId) {
        workspaceDaoHelper.deleteWorkspace(userWorkspaceId);
        return new ErrorPayload("Successfully delete the workspace with ID : " + userWorkspaceId);
    }

}
