package gov.uspto.patent.ptab.domain;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import gov.uspto.patent.ptab.utils.MilliSecEpochDeserializer;
import gov.uspto.patent.ptab.utils.MilliSecEpochSeralizer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * This support class has fields to record the life cycle of a record.Information like when the record begin date and end
 * date.
 * 
 * @author 2020 Development Team
 */
@Data
@JsonInclude(Include.NON_NULL)
@NoArgsConstructor
@AllArgsConstructor
public class LifeCycle {

    @JsonSerialize(using = MilliSecEpochSeralizer.class)
    @JsonDeserialize(using = MilliSecEpochDeserializer.class)
    private Date beginEffectiveDate;

    @JsonSerialize(using = MilliSecEpochSeralizer.class)
    @JsonDeserialize(using = MilliSecEpochDeserializer.class)
    private Date endEffectiveDate;
}
