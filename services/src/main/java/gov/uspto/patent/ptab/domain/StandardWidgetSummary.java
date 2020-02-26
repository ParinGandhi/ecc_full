package gov.uspto.patent.ptab.domain;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Getter;
import lombok.Setter;

/**
 * This class is used to store details of standard widgets
 *
 * @author 2020 Development Team
 *
 */
@Setter
@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class StandardWidgetSummary {

    private Integer widgetIdentifier;

    private String widgetName;
}
