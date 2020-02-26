package gov.uspto.patent.ptab.domain;

import java.math.BigDecimal;
import java.util.Date;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import gov.uspto.patent.ptab.utils.MilliSecEpochDeserializer;
import gov.uspto.patent.ptab.utils.MilliSecEpochSeralizer;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 * Description of Audit.
 *
 * @author 2020 Development Team
 */
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Audit {

    @JsonSerialize(using = MilliSecEpochSeralizer.class)
    @JsonDeserialize(using = MilliSecEpochDeserializer.class)
    // @NotNull(message = "lastModifiedTs cannot be blank")
    private Date lastModifiedTimestamp;

    @NotNull(message = "lastModifiedUserId cannot be blank")
    private String lastModifiedUserIdentifier;

    @NotNull(message = "creatorUserId cannot be blank")
    private String createUserIdentifier;

    private String createdUserName;

    private String lastModifiedUserName;

    @JsonSerialize(using = MilliSecEpochSeralizer.class)
    @JsonDeserialize(using = MilliSecEpochDeserializer.class)
    private Date createTimestamp;

    // @NotNull(message = "lock Control Number cannot be blank")
    private BigDecimal lockControlNumber;

}
