package gov.uspto.patent.ptab.domain;

import java.math.BigDecimal;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

/**
 * This class has the meta data fields for any given widget's display data
 * 
 * @author 2020 development team
 *
 */
@Setter
@Getter
public class WidgetMetaData {

    private BigDecimal paginationSize;

    private List<WidgetColumns> selectedColumns;

}
