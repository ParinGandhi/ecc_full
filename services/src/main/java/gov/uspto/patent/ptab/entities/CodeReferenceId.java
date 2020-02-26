package gov.uspto.patent.ptab.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * This class is used as primary key for Table CodeReference in PTAB DB
 *
 * @author 2020 Development Team
 *
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CodeReferenceId implements java.io.Serializable {
    private static final long serialVersionUID = 5035676240249596947L;

    private String typeCd;
    private String valueTx;
}
