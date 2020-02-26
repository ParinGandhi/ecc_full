package gov.uspto.patent.ptab.domain;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * This class is for CodeReferenceLookup information
 *
 * @author 2020 development team
 *
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CodeReferenceLookup {

    private String valueText;

    private String descriptionText;

    private String typeCode;

}
