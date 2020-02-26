package gov.uspto.patent.ptab.utils;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;
import static org.springframework.http.HttpStatus.METHOD_NOT_ALLOWED;

import javax.validation.ConstraintViolationException;

import org.apache.commons.lang3.StringUtils;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.InvalidDataAccessApiUsageException;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import lombok.extern.slf4j.Slf4j;

/**
 * Set of handler methods that are automatically injected into all controller
 * {@link org.springframework.web.bind.annotation.RestController} methods.
 *
 * @author 2020 Development Team
 */
@Slf4j
@ControllerAdvice
public class PtabControllerAdvice {

    /**
     * Provides equivalent to the JAX-RS WebApplicationException class for
     * Spring MVC projects.
     *
     * @param exception - Generic exception type that contains information for
     *            how to generate an error REST response.
     * @return
     */
    @SuppressWarnings("rawtypes")
    @ExceptionHandler(PTABException.class)
    public ResponseEntity handlePtabCustomException(final PTABException exception) {
        return exception.getResponseEntity();
    }

    /**
     * Handler for requested input validation failed.
     *
     * @param exception - ConstraintViolationException
     * @return
     */
    @ExceptionHandler(ConstraintViolationException.class)
    @ResponseStatus(BAD_REQUEST)
    @ResponseBody
    public ErrorPayload handleConstraintViolation(final ConstraintViolationException exception) {
        log.error(exception.getMessage(), exception);
        return new ErrorPayload("Mandatory Input is Missing");
    }

    /**
     * Handler for requested input validation failed.
     *
     * @param exception - ConstraintViolationException
     * @return
     */
    @ExceptionHandler(MissingServletRequestParameterException.class)
    @ResponseStatus(BAD_REQUEST)
    @ResponseBody
    public ErrorPayload handleMissingServletRequestParameterException(final MissingServletRequestParameterException exception) {
        log.error(exception.getMessage(), exception);
        return new ErrorPayload("Mandatory request parameter is missing");
    }

    /**
     * Handle the query exceptions
     *
     * @param exception - BindException
     * @return
     */
    @ExceptionHandler(org.springframework.validation.BindException.class)
    @ResponseStatus(BAD_REQUEST)
    @ResponseBody
    public ErrorPayload handleBindException(final org.springframework.validation.BindException exception) {
        final FieldError fieldError = exception.getBindingResult().getFieldError();
        final String message = fieldError.getDefaultMessage() + " (" + fieldError.getField() + ")";
        log.error(exception.getMessage(), exception);
        return new ErrorPayload(message);
    }

    /**
     * Empty JSON message
     *
     * @param exception - HttpMessageNotReadableException
     * @return
     */
    @ExceptionHandler(HttpMessageNotReadableException.class)
    @ResponseStatus(BAD_REQUEST)
    @ResponseBody
    public ErrorPayload handleEmptyJSON(final HttpMessageNotReadableException exception) {
        log.error(exception.getMessage(), exception);
        return new ErrorPayload("JSON cannot be empty");
    }

    /**
     * Handler for Data Constraints(Unique Key) Violation.
     *
     * @param exception - DataIntegrityViolationException
     * @return
     */
    @ExceptionHandler(DataIntegrityViolationException.class)
    @ResponseStatus(BAD_REQUEST)
    @ResponseBody
    public ErrorPayload handleDataIntegrityViolation(final DataIntegrityViolationException exception) {
        log.error(exception.getMessage(), exception);
        return new ErrorPayload("Issue with Data :"
                + StringUtils.removeStartIgnoreCase(exception.getMostSpecificCause().getMessage(), "ORA-00001:"));
    }

    /**
     * Handler for Data foreign key violation.
     *
     * @param exception - InvalidDataAccessApiUsageException
     * @return
     */
    @ExceptionHandler(InvalidDataAccessApiUsageException.class)
    @ResponseStatus(BAD_REQUEST)
    @ResponseBody
    public ErrorPayload handleInvalidDataAccess(final InvalidDataAccessApiUsageException exception) {
        log.error(exception.getMessage(), exception);
        return new ErrorPayload("Please enter valid Reference/Parent Key Data");
    }

    /**
     * Handler for required input field.
     *
     * @param exception - MethodArgumentNotValidException
     * @return
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(BAD_REQUEST)
    @ResponseBody
    public ErrorPayload validationError(final MethodArgumentNotValidException exception) {

        final FieldError fieldError = exception.getBindingResult().getFieldError();
        final String message = " (" + fieldError.getField() + ") " + fieldError.getDefaultMessage();
        return new ErrorPayload(message);
    }

    /**
     * Handler for system exception failed response.
     *
     * @param exception - HttpRequestMethodNotSupportedException Error
     * @return
     */
    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    @ResponseStatus(METHOD_NOT_ALLOWED)
    @ResponseBody
    public ErrorPayload handleHttpRequestMethodNotSupportedException(final HttpRequestMethodNotSupportedException exception) {
        log.error(exception.getMessage(), exception);
        return new ErrorPayload(exception.getMessage());
    }

    /**
     * Handler for system exception failed response.
     *
     * @param exception - System Error
     * @return
     */
    @ExceptionHandler(Exception.class)
    @ResponseStatus(INTERNAL_SERVER_ERROR)
    @ResponseBody
    public ErrorPayload handleException(final Exception exception) {
        log.error(exception.getMessage(), exception);
        return new ErrorPayload("Application System Error.Please Contact PTAB Support Team");
    }

}
