package gov.uspto.patent.ptab.domain;

import java.math.BigDecimal;
import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Getter;
import lombok.Setter;

/**
 * This class has the fields for the USer Workspace Widget
 * 
 * @author 2020 Development Team
 *
 */
@Setter
@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserWorkspaceWidget {

    private Integer userWorkspaceWidgetIdentifier;

    @Valid
    private UserWorkspaceSummary userWorkspaceData;

    private String widgetCustomName;

    @Size(min = 1, max = 30, message = " must be between {min} and {max} characters ")
    private String widgetPositionText;

    private String widgetHeightPixelQuality;

    @Size(min = 0, max = 4000, message = " must be between {min} and {max} characters ")
    private String configText;

    @Size(min = 1, max = 20, message = " must be between {min} and {max} characters ")
    private String widgetColor;

    @Valid
    private StandardWidgetSummary widgetData;

    @Valid
    private StandardViewLayout viewLayoutData;

    private Boolean deleteAfterCopy;

    private Audit auditData;

    private String dataUrlText;

    private Integer zoneWidth;

    private Boolean copyFavorites;

    private BigDecimal paginationSize;

    private List<WidgetColumns> selectedColumns;

    private String selectedColumnsAsStr;

}
