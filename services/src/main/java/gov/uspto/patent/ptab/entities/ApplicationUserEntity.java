package gov.uspto.patent.ptab.entities;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 * This class is used to persist Table ApplicationUser in PTAB DB
 *
 * @author 2020 Development Team
 *
 *         Note: userCt is CHAR(8); cfkPatronId is CHAR(36)
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@ToString
@Table(name = "APPLICATION_USER")
public class ApplicationUserEntity implements java.io.Serializable {

    private static final long serialVersionUID = -7571705803142462041L;

    @Id
    @Column(name = "APPLICATION_USER_ID", unique = true, nullable = false, precision = 10, scale = 0)
    @GeneratedValue(generator = "APPLICATION_USER_SEQ")
    @SequenceGenerator(sequenceName = "APPLICATION_USER_SEQ", allocationSize = 1, name = "APPLICATION_USER_SEQ")
    private BigDecimal applicationUserId;

    @Column(name = "USER_CT")
    private String userCt;
    @Column(name = "CFK_PATRON_ID")
    private String cfkPatronId;
    @Column(name = "CFK_EMPLOYEE_ID")
    private String cfkEmployeeId;
    @Column(name = "BEGIN_EFFECTIVE_DT")
    private Date beginEffectiveDt;
    @Column(name = "END_EFFECTIVE_DT")
    private Date endEffectiveDt;
    @Column(name = "EMAIL_ADDRESS_TX")
    private String emailAddressTx;
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
    @Column(name = "FIRST_NM")
    private String firstNm;
    @Column(name = "LAST_NM")
    private String lastNm;
    @Column(name = "MIDDLE_NM")
    private String middleNm;
    @Column(name = "LAST_LOGIN_TS")
    private Date lastLoginTs;
    @Column(name = "USER_ID")
    private String userId;
    @Column(name = "APPEALS_AFFILIATION_CT")
    private String appealsAffiliationCt;
    @Column(name = "FK_ACTS_EMPLOYEE_NO")
    private String fkActsEmployeeNo;
    @Column(name = "APJ_SENIORITY_RANK_NO")
    private BigDecimal apjSeniorityRankNo;
    @Column(name = "JOB_CLASSIFICATION_CD")
    private String jobClassificationCd;
    @Column(name = "PREFERRED_FULL_NM")
    private String preferredFullNm;
    @Column(name = "FAX_NO")
    private String faxNo;
    @Column(name = "PRIMARY_TELEPHONE_NO")
    private String primaryTelephoneNo;
    @Column(name = "TRIAL_JUDGE_IN")
    private Character trialJudgeIn;
    @Column(name = "LEAD_APJ_IN")
    private Character leadApjIn;
    @Column(name = "DIVISION_NM")
    private String divisionName;
    @Column(name = "SECTION_NM")
    private String sectionName;
    
}
