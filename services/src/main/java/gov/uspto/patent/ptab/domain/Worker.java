package gov.uspto.patent.ptab.domain;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Created this class to provide worker service response JSON.
 *
 * @author 2020 Development Team
 */
@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor
@AllArgsConstructor
public class Worker {

    private String workerNumber;
    private String lastName;
    private String firstName;
    private String middleName;
    private boolean activeIndicator;
    private String loginIdentifier;
    private String fullName;
    private String workerId;
    private Boolean supervisorIndicator;
}
