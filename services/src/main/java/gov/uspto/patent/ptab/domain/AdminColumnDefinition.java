package gov.uspto.patent.ptab.domain;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import lombok.Getter;
import lombok.Setter;

/**
 * Contains column name properties for admin
 * 
 * @author 2020 development team
 *
 */
@Setter
@Getter
@JsonInclude(Include.NON_NULL)
public class AdminColumnDefinition {

    private String name;
    private String displayName;
    private String typeDefinition;
    private String cellTemplate;
    private String width;
    private boolean enableSorting;
    private boolean enableFiltering;
}
