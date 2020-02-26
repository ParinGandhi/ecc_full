package gov.uspto.patent.ptab.domain;

import java.math.BigDecimal;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import lombok.Getter;
import lombok.Setter;

/**
 * The class holds the data required for worker
 *
 * @author 2020 Development Team
 *
 */
@Getter
@Setter
@JsonInclude(Include.NON_NULL)
public class EmployeeDetails {

    private String firstName;
    private String middleName;
    private String lastName;
    private BigDecimal assigneeNumber;
    private String role;
    private String description;
    private Date endDate;
    private String panelMemberIdentifier;
    private String workerNumber;
    private BigDecimal rankId;
    private BigDecimal applicationUserId;
    private String userCt;
}