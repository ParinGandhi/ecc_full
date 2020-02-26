package gov.uspto.patent.ptab.domain;

import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Getter;
import lombok.Setter;

/**
 * Application User information
 * 
 * @author 2020 Development Team
 */

@Setter
@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApplicationUserResponse {

    private Integer applicationUserIdentifier;

    @Size(min = 1, max = 8, message = "User Category must be between {min} and {max} characters ")
    private String userCategory;

    @Size(min = 1, max = 36, message = "Patron Id must be between {min} and {max} characters ")
    private String patronIdentifier;

    @Size(min = 0, max = 6, message = "Employee Number must be between {min} and {max} characters ")
    private String employeeNumber;

    @Size(min = 0, max = 320, message = "Email Address must be between {min} and {max} characters ")
    private String emailAddressText;

    @Size(min = 0, max = 60, message = "First Name must be between {min} and {max} characters ")
    private String firstName;

    @Size(min = 0, max = 60, message = "Last Name must be between {min} and {max} characters ")
    private String lastName;

    @Size(min = 0, max = 60, message = "Middle Name must be between {min} and {max} characters ")
    private String middleName;

    @Size(min = 0, max = 20, message = "User Identifier must be between {min} and {max} characters ")
    private String userIdentifier;

    @Size(min = 0, max = 20, message = "Appeals Application Category must be between {min} and {max} characters ")
    private String appealsApplicationCategory;

    private Long lastLoginDateTime;
}
