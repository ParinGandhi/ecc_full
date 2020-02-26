package gov.uspto.patent.ptab.utils;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 * This class contains fields used in JSON response payload for error conditions.
 * 
 * @author 2020 Development Team
 */
@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class ErrorPayload {

    private final String message;
}
