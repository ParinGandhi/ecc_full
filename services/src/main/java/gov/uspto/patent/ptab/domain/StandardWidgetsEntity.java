package gov.uspto.patent.ptab.domain;

import java.math.BigDecimal;

import lombok.Getter;
import lombok.Setter;

/**
 * This class is used to store standard widget details
 *
 * @author 2020 Development Team
 *
 */
@Setter
@Getter
public class StandardWidgetsEntity {

    private Integer identifier;
    private String widgetName;
    private String noteText;
    private String configText;
    private Integer displayOrder;
    private String subCategoryName;
    private Integer subCategoryId;
    private String stndWidgetDataUrlText;

}
