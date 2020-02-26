package gov.uspto.patent.ptab.domain.named.query;

import java.math.BigDecimal;
import java.math.BigInteger;

import lombok.Getter;
import lombok.Setter;

/**
 * 
 * This class has user workspace and widget details
 * 
 * @author 2020 Development Team
 *
 */
@Setter
@Getter
public class UserWorkspaceAndWidgetDetail {

    private String firstName;
    private String middleName;
    private String lastName;
    private String emailAddressText;
    private String userType;
    private Integer workspaceIdentifier;
    private String workspaceName;
    private String workspaceLayout;
    private Character workspaceDefaultIndicator;
    private Integer workspaceOrder;
    private Integer widgetIdentifier;
    private Integer stndWidgetIdentifier;
    private String widgetPosition;
    private String widgetDescription;
    private String widgetCategory;
    private String widgetName;
    private String widgetConfigurationText;
    private String widgetHeight;
    private String widgetColor;
    private String dataUrlText;
    private String stndWidgetDataUrlText;
    private String maxNoOfWorkspacesAllowed;
    private String maxWorkspaceTitleLength;
    private String widgetStndName;
    private String workspaceUserId;
    private BigInteger countOfWidgets;
    private String workspaceStructureMapping;
}
