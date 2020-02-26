package gov.uspto.patent.ptab.utils;

/**
 * Custom exception class for handling validation errors
 * 
 * @author 2020 Development Team
 */
public class RuleSetNotFoundException extends Exception {

    private static final long serialVersionUID = 3886207966998385868L;

    /**
     * Method to send HTTP status code and error pay load message
     * 
     * @param status - status code
     * @param json - error pay load content
     */
    public RuleSetNotFoundException(final String msg) {
        super(msg);
    }

    public RuleSetNotFoundException(final Throwable cause) {
        super(cause);
    }

    public RuleSetNotFoundException(final String message, final Throwable cause) {
        super(message, cause);
    }

    public RuleSetNotFoundException() {
        super();
    }
}
