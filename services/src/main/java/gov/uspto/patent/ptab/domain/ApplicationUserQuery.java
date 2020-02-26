package gov.uspto.patent.ptab.domain;

import lombok.Data;

@Data
public class ApplicationUserQuery {

    private String loginId;
    private String userWorkerNumber;
    private String userIdentiifier;
    private String firstName;
    private String lastName;
}
