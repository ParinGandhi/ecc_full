package gov.uspto.patent.ptab.utils;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import lombok.Getter;

/**
 * Custom exception class for handling validation errors
 * 
 * @author 2020 Development Team
 */
@SuppressWarnings("serial")
public class PtabCustomException extends RuntimeException {

    @Getter
    private final transient ResponseEntity<Object> responseEntity;

    /**
     * Method to send HTTP status code and error pay load message
     * 
     * @param status - status code
     * @param json - error pay load content
     */
    public PtabCustomException(final HttpStatus status, final Object json) {
        this.responseEntity = new ResponseEntity<>(json, status);
    }
}
