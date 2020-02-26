package gov.uspto.patent.ptab.domain;

import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Getter;
import lombok.Setter;

/**
 * This class has the fields for Standard View
 * 
 * @author 2020 Development Team
 *
 */
@Setter
@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class StandardViewLayout {

    private int viewLayoutIdentifier;

    private String viewLayoutName;

    @Size(min = 0, max = 320, message = "Description text must be between {min} and {max} characters ")
    private String descriptionText;

}
