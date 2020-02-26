package gov.uspto.patent.ptab.domain;

import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Getter;
import lombok.Setter;

/**
 * User Work Space information
 * 
 * @author 2020 Development Team
 * 
 */
@Setter
@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserWorkspace {

    private Integer userWorkspaceIdentifier;

    @Size(min = 0, max = 50, message = "  must be between {min} and {max} characters ")
    private String userWorkspaceName;

    @Size(min = 0, max = 320, message = "  must be between {min} and {max} characters ")
    private String desciptionText;

    private boolean defaultIndicator;

    @Size(min = 0, max = 500, message = " must be between {min} and {max} characters ")
    private String structure;

    private Integer currentWorkspaceOrderNumber;

    private Integer newWorkspaceOrderNumber;

    private List<UserWorkspaceWidget> userWorkspaceWidgetsData;

    @Valid
    @NotNull
    private Audit auditData;

}
