package gov.uspto.patent.ptab.entities;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.MappedSuperclass;

import lombok.Getter;
import lombok.Setter;

/**
 * Class is used to provide the business audit information.
 * 
 * @author 2020 Development Team
 *
 */
@Getter
@Setter
@MappedSuperclass
public class AuditEntitiy {

    private Date beginEffectiveDt;
    private Date endEffectiveDt;
    private BigDecimal createUserId;
    private Date createTs;
    private BigDecimal lastModUserId;
    private Date lastModTs;
    private BigDecimal lockControlNo;

}
