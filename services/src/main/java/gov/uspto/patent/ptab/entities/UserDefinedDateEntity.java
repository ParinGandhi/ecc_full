package gov.uspto.patent.ptab.entities;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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
@Table(name = "USER_DEFINED_DATE")
public class UserDefinedDateEntity implements java.io.Serializable {
   
    private static final long serialVersionUID = 3783513131014846152L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "USER_DEFINED_DATE_SEQ")
    @SequenceGenerator(sequenceName = "USER_DEFINED_DATE_SEQ", allocationSize = 1, name = "USER_DEFINED_DATE_SEQ")
    @Column(name = "USER_DEFINED_DATE_ID")
    private BigDecimal dateIdentifer;
    
    @Column(name = "FK_APPLICATION_USER_ID")
    private BigDecimal applicationUserId;
    
    @Column(name = "USER_DEFINED_DATE_TITLE_NM")
    private String dateTitleName;
    
    @Column(name = "SEQUENCE_NO")
    private BigDecimal sequenceNumber;
    
    @Column(name = "BEGIN_EFFECTIVE_DT")
    private Date beginEffectiveDate;
    
    @Column(name = "END_EFFECTIVE_DT")
    private Date endEffectiveDate;
    
    @Column(name = "CREATE_USER_ID")
    private BigDecimal createUserId;
    
    @Column(name = "CREATE_TS")
    private Date createTs;
    
    @Column(name = "LAST_MOD_USER_ID")
    private BigDecimal lastModUserId;
    
    @Column(name = "LAST_MOD_TS")
    private Date lastModTs;
    
    @Column(name = "LOCK_CONTROL_NO")
    private BigDecimal lockControlNo;

}
