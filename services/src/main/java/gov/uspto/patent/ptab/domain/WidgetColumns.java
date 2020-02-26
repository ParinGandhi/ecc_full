package gov.uspto.patent.ptab.domain;

import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Getter;
import lombok.Setter;

/**
 * This class has parameters for the Workspace Widget's Columns
 *
 * @author 2020 Development Team
 *
 */
@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class WidgetColumns {

    private List<String> columnName;
    private String aliasName;
    private String tableName;
    private String columnLabel;
    private String columnType;
    private String defaultOrder;
    private boolean visible;
    private boolean mandatory;
    private Integer width;
    private Map<String, Object> sort;
    private List<Map<String, Object>> filters;
    private String pinned;
    private String cellFilter;
    private String cellTemplate;
    private String aggregationType;
    private String aggregationLabel;
    private String cellClass;
    private String ariaLabel;
}
