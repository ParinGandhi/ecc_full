package gov.uspto.patent.ptab.domain;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import lombok.Data;

@Data
@JsonInclude(Include.NON_NULL)
public class ApplicationUser {

	private String loginId;
	private String userWorkerNumber;
	private BigDecimal userIdentiifier;
	private String firstName;
	private String lastName;
	private String disiplanceCd;
	private String fullName;
	private String activeIn;
	private String emailAddress;
	private String roleDescription;
	private String jobClassificationCode;
	private List<String> privileges;
	private String preferredFullName;
	private String faxNumber;
	private String phoneNumber;
	private BigDecimal apjSeniorityRank;
	private String trialJudgeIndicator;
	private String section;
	private String leadApjIndicator;
	private String supervisorName;
	private String titleDescription;
	private Integer activeCasesCount;

}
