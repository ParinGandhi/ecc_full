package gov.uspto.patent.ptab.domain;

import javax.validation.Valid;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * Class is used to provide the business audit information.
 * 
 * @author 2020 Development Team
 *
 */
@Getter
@Setter
@ToString
@JsonInclude(Include.NON_NULL)
public class LifeCycleAudit {
    @Valid
    private LifeCycle lifeCycle;

    @Valid
    private Audit audit;
}
