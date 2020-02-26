package gov.uspto.patent.ptab.domain;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Getter;
import lombok.Setter;

/**
 * 
 * This class has parameters related to workspace and widgets
 * 
 * @author 2020 Development Team
 *
 */
@Setter
@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserWorkspaceAndWidgetsInformation {

    private ApplicationUserResponse applicationUserData;
    private Integer maximumNumberOfWorkspacesAllowed;
    private Integer maximumWorkspaceTitleLengthAllowed;
    private List<UserWorkspace> userWorkspaces;

}
