package gov.uspto.patent.ptab.entities;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * This class is used to persist Table StndResourceObject in PTAB DB
 *
 * @author 2020 Development Team
 *
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "STND_RESOURCE_OBJECT")
public class StndResourceObjectEntity implements java.io.Serializable {
    private static final long serialVersionUID = -8769538910539905992L;

    @Id
    @Column(name = "RESOURCE_OBJECT_ID")
    private BigDecimal resourceObjectId;

    @Column(name = "BEGIN_EFFECTIVE_DT")
    private Date beginEffectiveDt;

    @Column(name = "CONFIG_DOC")
    private String configDoc;

    @Column(name = "CREATE_TS")
    private Date createTs;

    @Column(name = "CREATE_USER_ID")
    private BigDecimal createUserId;

    @Column(name = "DESCRIPTION_TX")
    private String descriptionTx;

    @Column(name = "DISPLAY_ORDER_SEQUENCE_NO")
    private BigDecimal displayOrderSequenceNo;

    @Column(name = "END_EFFECTIVE_DT")
    private Date endEffectiveDt;

    @Column(name = "LAST_MOD_TS")
    private Date lastModTs;

    @Column(name = "LAST_MOD_USER_ID")
    private BigDecimal lastModUserId;

    @Column(name = "LOCK_CONTROL_NO")
    private BigDecimal lockControlNo;

    @Column(name = "RESOURCE_OBJECT_NM")
    private String resourceObjectNm;

    @Column(name = "RESOURCE_OBJECT_TYPE_NM")
    private String resourceObjectTypeNm;

    @Column(name = "RESOURCE_OBJECT_VALUE_TX")
    private String resourceObjectValueTx;
}
