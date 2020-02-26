package gov.uspto.patent.ptab.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import gov.uspto.patent.ptab.domain.ApplicationUserQuery;
import gov.uspto.patent.ptab.domain.ApplicationUserView;
import gov.uspto.patent.ptab.service.UserManagementService;

/**
 * This class handles REST calls for User Relationship.
 *
 * @author 2020 development team
 *
 */
@RestController
@RequestMapping(value = "/user-management")
public class UserManagementController {

    @Autowired
    private UserManagementService userManagementService;

    /**
     * This method is used to retrieve user info
     *
     * @param applicationUserQuery
     * @return
     */
    @GetMapping(value = "/user-info")
    public ApplicationUserView getUserInfo(ApplicationUserQuery applicationUserQuery) {
        return userManagementService.getUserInfo(applicationUserQuery);

    }
    
}
