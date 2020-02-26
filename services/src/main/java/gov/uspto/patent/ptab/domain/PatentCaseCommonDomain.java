package gov.uspto.patent.ptab.domain;

import javax.validation.Valid;

import org.codehaus.jackson.annotate.JsonIgnore;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Getter;
import lombok.Setter;

/**
 * Description of PatentCaseCommonDomain. Main business domain which is being used across all patent case domains . Contains
 * attributes to track life cycle of the domains.
 *
 * @author 2020 Development Team
 */
@Setter
@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PatentCaseCommonDomain {

    @JsonIgnore
    private LifeCycle lifeCycle;



    @Valid
    @JsonIgnore
    private Audit audit;

}
