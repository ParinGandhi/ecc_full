package gov.uspto.patent.ptab.entities;

import java.math.BigDecimal;
import java.sql.Clob;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 * This class is used to persist Table UserCustomData in PTAB DB
 *
 * @author 2020 Development Team
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@ToString
@Table(name = "USER_CUSTOM_DATA")
public class UserCustomDataEntity implements java.io.Serializable {    
 
    private static final long serialVersionUID = -2786774665300948142L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "USER_CUSTOM_DATA_SEQ")
    @SequenceGenerator(sequenceName = "USER_CUSTOM_DATA_SEQ", allocationSize = 1, name = "USER_CUSTOM_DATA_SEQ")
    @Column(name = "USER_CUSTOM_DATA_ID")
    private BigDecimal userCustomDataId;
    
    @Column(name = "FK_APPLICATION_USER_ID")
    private BigDecimal applicationUserId;
    @Column(name = "CUSTOM_DATA_NM")
    private String customDataName;
    @Column(name = "DESCRIPTION_TX")
    private String descriptionText;
    @Column(name = "CONFIG_DOC")
    @Lob
    private String configurationDoc;
    @Column(name = "END_EFFECTIVE_DT")
    private Date endEffectiveDt;
    @Column(name = "CREATE_TS")
    private Date createTs;
    @Column(name = "CREATE_USER_ID")
    private BigDecimal createUserId;
    @Column(name = "LAST_MOD_TS")
    private Date lastModTs;
    @Column(name = "LAST_MOD_USER_ID")
    private BigDecimal lastModUserId;
    @Column(name = "LOCK_CONTROL_NO")
    private BigDecimal lockControlNo;
}
