package gov.uspto.patent.ptab.domain;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import lombok.Getter;
import lombok.Setter;

/**
 * This class is to handle Application user Data
 * 
 * @author 2020 development team
 *
 */
@Setter
@Getter
@JsonInclude(Include.NON_NULL)
public class ApplicationUserView {

    private List<AdminColumnDefinition> columnDetails;

    private List<ApplicationUser> caseDetailsData;
    
}
