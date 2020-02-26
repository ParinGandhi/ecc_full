package gov.uspto.patent.ptab.entities;

import java.math.BigDecimal;
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
 * This class is used to persist Table UserReadCirculationNoteEntity in PTAB DB
 *
 * @author 2020 Development Team
 *
 * 
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@ToString
@Table(name = "USER_READ_CIRCULATION_NOTE")
public class UserReadCirculationNoteEntity implements java.io.Serializable {

    private static final long serialVersionUID = 555333364128872501L;

    @Id
    @Column(name = "USER_READ_CIRCULATION_NOTE_ID", unique = true, nullable = false, precision = 10, scale = 0)
    @GeneratedValue(generator = "USER_READ_CIRCULATION_NOTE_SEQ")
    @SequenceGenerator(sequenceName = "USER_READ_CIRCULATION_NOTE_SEQ", allocationSize = 1, name = "USER_READ_CIRCULATION_NOTE_SEQ")
    private BigDecimal userReadCirculationNoteId;

    @Column(name = "FK_CIRCULATION_NOTE_ID")
    private BigDecimal fkCirculationNoteId;

    @Column(name = "FK_APPLICATION_USER_ID")
    private BigDecimal fkApplicationUserId;

    @Column(name = "VIEW_TS")
    private Date viewTs;

    @Column(name = "READ_TS")
    private Date readTs;

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
