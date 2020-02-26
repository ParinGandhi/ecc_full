package gov.uspto.patent.ptab.entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * This class is used to persist Table CodeReference in PTAB DB
 *
 * @author 2020 Development Team
 *
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@IdClass(CodeReferenceId.class)
@Table(name = "CODE_REFERENCE")
public class CodeReferenceEntity implements java.io.Serializable {
    private static final long serialVersionUID = -5018342290578086000L;

    @Id
    @Column(name = "TYPE_CD")
    private String typeCd;

    @Id
    @Column(name = "VALUE_TX")
    private String valueTx;

    @Column(name = "DESCRIPTION_TX")
    private String descriptionTx;

    @Column(name = "LAST_MODIFIED_USER_ID")
    private String lastModifiedUserId;

    @Column(name = "LAST_MODIFIED_TS")
    private Date lastModifiedTs;
}
