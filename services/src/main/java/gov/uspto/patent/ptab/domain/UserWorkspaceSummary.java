package gov.uspto.patent.ptab.domain;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Getter;
import lombok.Setter;

/**
 * User Work Space Summary Information
 * 
 * @author 2020 Development Team
 * 
 */
@Setter
@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserWorkspaceSummary {

    @NotNull(message = "Workspace Id is a required field")
    private Integer userWorkspaceIdentifier;

    private String userWorkspaceName;

}
