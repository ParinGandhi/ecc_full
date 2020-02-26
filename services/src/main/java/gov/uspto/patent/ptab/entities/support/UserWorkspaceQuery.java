package gov.uspto.patent.ptab.entities.support;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

/**
 * This class has query parameters to fetch Workspace details either by userId or userWorkspaceId
 * 
 * @author 2020 Development Team
 *
 */
@Setter
@Getter
@RequiredArgsConstructor
public class UserWorkspaceQuery {

    private String userIdentifier;
    private Integer userWorkspaceIdentifier;

}
