package gov.uspto.patent.ptab.utils;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import lombok.Getter;

/**
 * Custom exception class for handling validation errors
 * 
 * @author 2020 Development Team
 * 
 */
public class PTABException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    @Getter
    private final transient ResponseEntity<Object> responseEntity;

    /**
     * Method to send HTTP status code and error pay load message
     * 
     * @param status - HTTP status that is returned in header and cannot be null
     * @param json- Payload thats returned and cannot be null
     */
    public PTABException(final HttpStatus status, final Object json) {
        super(null == json ? "" : json.toString());
        this.responseEntity = new ResponseEntity<>(json, status);
    }

    /**
     * Method to send HTTP status code,error pay load message and original exception
     * 
     * @param status - HTTP status that is returned in header and cannot be null
     * @param json - Payload thats returned and cannot be null
     * @param cause - Original exception
     */
    public PTABException(final HttpStatus status, final Object json, final Throwable cause) {
        super(cause);
        this.responseEntity = new ResponseEntity<>(json, status);
    }

    /**
     * Method to send just the status code
     * 
     * @param status - HTTP status that is returned in header and cannot be null
     */
    public PTABException(final HttpStatus status) {
        super(null == status ? "Failed" : "Failed with status:" + status.getReasonPhrase());
        this.responseEntity = new ResponseEntity<>(status);
    }

}
