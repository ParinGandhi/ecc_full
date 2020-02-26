package gov.uspto.patent.ptab.domain;

import java.util.List;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * This class has fields needed for displaying and then updating the widgets position in bulk
 * 
 * @author 2020 Development Team
 *
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class WidgetsByZones {

    private Integer userWorkspaceIdentifier;
    private Map<Integer, List<UserWorkspaceWidget>> zoneWidgetsMap;

}
