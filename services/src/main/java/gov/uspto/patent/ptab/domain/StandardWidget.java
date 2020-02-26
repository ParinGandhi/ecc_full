package gov.uspto.patent.ptab.domain;

import lombok.Getter;
import lombok.Setter;

/**
 * This class has the details for the standard widget
 * 
 * @author 2020 Development Team
 *
 */
@Setter
@Getter
public class StandardWidget extends PatentCaseCommonDomain {

    private String identifier;
    private String widgetName;
    private String subcategoryIdentifier;
    private String noteText;
    private String configText;
    private Integer displayOrder;
    private String widgetDataUrlText;

    private StndWidgetSubcategoryInfo subcategoryInfo;
    private WidgetMetaData columnsDetails;

}
