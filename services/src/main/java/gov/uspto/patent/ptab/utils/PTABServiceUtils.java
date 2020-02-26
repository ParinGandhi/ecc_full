package gov.uspto.patent.ptab.utils;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.CONFLICT;
import static org.springframework.http.HttpStatus.NOT_FOUND;

import java.io.DataInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Clob;
import java.sql.SQLException;
import java.util.Collection;
import java.util.Date;
import java.util.Iterator;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpStatus;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;


/***
 * Sets the lock control number and audit information sent as part of the response.
 *
 * @author 2020 Development Team
 */
public final class PTABServiceUtils {

    private static final String COLUMN_DETAILS = "columnDetails";
    private static final String JSON_NOT_FOUND_ERROR_MESSAGE = "found that match the query";
    private static final String NOT_FOUND_NO_ERROR_MESSAGE = "No";
    private static final String COMMA_SPACE = ", ";
    private static final String SPACE = " ";

    private PTABServiceUtils() {
    }

    /**
     * Helper method used in reference data controller to check if a particular reference data type exists or not
     *
     * @param data - standard table data
     * @param type - reference data type
     * @return
     * @throws RestException - 404 if record not found
     */
    public static <T> T notFoundIfNull(final T data, final String type) {
        if (null == data) {
            throw new PTABException(NOT_FOUND,
                    new ErrorPayload(NOT_FOUND_NO_ERROR_MESSAGE + " " + type + " " + JSON_NOT_FOUND_ERROR_MESSAGE));
        }
        return data;
    }

    /**
     * Helper method used in reference data controller to check if a particular reference data type exists or not
     *
     * @param data - standard table data
     * @param type - reference data type
     * @return
     * @throws RestException - 404 if record not found
     */
    public static <T> T notFoundIfNotNull(final T data, final String type) {
        if (null != data) {
            throw new PTABException(NOT_FOUND,
                    new ErrorPayload(NOT_FOUND_NO_ERROR_MESSAGE + " " + type + " " + JSON_NOT_FOUND_ERROR_MESSAGE));
        }
        return data;
    }

    /**
     * Helper method used in controller to check if a particular data collection empty or not.
     *
     * @param data - collections for which error occurred
     * @param type - entity type
     * @return
     */
    public static <T> Collection<T> notFoundIfNullCollection(final Collection<T> data, final String type) {
        if (CollectionUtils.isEmpty(data)) {
            throw new PTABException(NOT_FOUND,
                    new ErrorPayload(NOT_FOUND_NO_ERROR_MESSAGE + " " + type + " " + JSON_NOT_FOUND_ERROR_MESSAGE));
        }
        return data;
    }

    /**
     * This method throws exception with http status 400 if the input condition is true.
     *
     * @param condition - input condition
     * @param messageKey - error message key
     */
    public static void validateCondition(final boolean condition, final String messageKey) {
        if (condition) {
            throw new PTABException(BAD_REQUEST,
                    new ErrorPayload(PTABMessageConfigUtils.getMessage(messageKey, new Object[] {})));
        }
    }

    /**
     * To validate condition throw Exception
     *
     * @param condition
     * @param messageKey
     */
    public static void validateConditionAndThrowException(final boolean condition, final String messageKey) {
        if (condition) {
            throw new PTABException(NOT_FOUND, new ErrorPayload(PTABMessageConfigUtils.getMessage(messageKey, new Object[] {})));
        }
    }

    /**
     * This method is used to convert the int value of BigDecimal to String
     *
     * @param input - input Big Decimal
     * @return
     */
    public static String convertBigDecimalToString(final BigDecimal input) {
        return null != input ? String.valueOf(input.intValue()) : null;
    }

    /**
     * This method is used to convert an Object to String
     *
     * @param eachInput - Object to be converted to String
     * @return
     */
    public static String convertObjectToString(final Object eachInput) {
        String returnStr = null;
        if (null != eachInput) {
            if (eachInput instanceof Clob) {
                try {
                    final Clob clobValue = (Clob) eachInput;
                    returnStr = clobValue.getSubString(1, (int) clobValue.length());
                } catch (final SQLException e) {
                    throw new PTABException(HttpStatus.INTERNAL_SERVER_ERROR,
                            new ErrorPayload("Error occured while converting Clob to String"), e);
                }
            } else {
                returnStr = String.valueOf(eachInput);
            }
        }
        return returnStr;
    }

    /**
     * This method fetched the node elements from the input stream
     *
     * @param inputStream - Input stream of file
     * @return
     * @throws IOException
     */
    public static Iterator<JsonNode> fetchNodeElements(final InputStream inputStream) throws IOException {
        final byte[] jsonData = new byte[inputStream.available()];
        final ObjectMapper objectMapper = new ObjectMapper();
        JsonNode rootNode;
        final DataInputStream dataInputStream = new DataInputStream(inputStream);
        dataInputStream.readFully(jsonData);
        rootNode = objectMapper.readTree(jsonData);
        final JsonNode nodeDetails = rootNode.path(COLUMN_DETAILS);
        return nodeDetails.elements();

    }

    /**
     * This method is used to remove file
     *
     * @param fileName- absolute path of file to be removed
     */
    public static void removeFile(final String fileName) throws IOException {
        if (StringUtils.isNotBlank(fileName)) {
            final Path path = Paths.get(fileName);
            Files.delete(path);
        }
    }

    /**
     * This method is to validate at least one collections parameter is provided.
     *
     * @param data - collection data to validate
     * @param errorMessage - error message key
     * @return
     */
    public static void validateStringReqest(final String data, final String errorMessage) {
        if (StringUtils.isBlank(data)) {
            throw new PTABException(BAD_REQUEST, new ErrorPayload("Please enter " + errorMessage));
        }
    }

    /**
     * To validate condition throw Exception
     *
     * @param condition - Condition on which it throws exception
     * @param messageKey - error message key
     * @param status - Enumeration of HTTP status codes provided by spring
     */
    public static void validateConditionAndThrowExceptionStatus(final boolean condition, final String messageKey,
            final HttpStatus status) {
        if (condition) {
            throw new PTABException(status, new ErrorPayload(PTABMessageConfigUtils.getMessage(messageKey, new Object[] {})));

        }
    }

    /**
     * Helper method used to check if input object exists or not and throws 404 if not found
     *
     * @param data - standard table data
     * @param type - substitute value for error message template
     */
    public static <T> void notFoundIfNull(final T data, final String messageKey, final String value) {
        if (null == data) {
            throw new PTABException(NOT_FOUND,
                    new ErrorPayload(PTABMessageConfigUtils.getMessage(messageKey, new Object[] { value })));

        }
    }

    /**
     * This method is to validate at least one collections parameter is provided.
     *
     * @param data - collection data to validate
     * @param messageKey - error message key
     * @return
     */
    public static <T> void notFoundIfNullCollection(final Collection<T> data, final String messageKey, final String value) {
        if (CollectionUtils.isEmpty(data)) {
            throw new PTABException(NOT_FOUND,
                    new ErrorPayload(PTABMessageConfigUtils.getMessage(messageKey, new Object[] { value })));

        }
    }

    /**
     * This method validates the input condition and throws exception with the input message and status
     *
     * @param condition - Condition on which it throws exception
     * @param buildMessage - Message to return
     * @param status - HTTPStatus to return
     */
    public static void validateAndThrowExceptionWithMsg(final boolean condition, final String buildMessage,
            final HttpStatus status) {
        if (condition) {
            throw new PTABException(status, new ErrorPayload(buildMessage));
        }
    }

   

    /**
     * This method is used to get fullName of workers
     *
     * @param firstName - request object to be processed
     * @param middleName - request object to be processed
     * @param lastName - request object to be processed
     * @return
     */
    public static String getWorkerFullName(final String firstName, final String lastName, final String middleName) {

        return Stream.of(StringUtils.trimToEmpty(lastName), StringUtils.trimToEmpty(firstName))

                .filter(s -> s != null && !s.isEmpty()).collect(Collectors.joining(COMMA_SPACE)) + SPACE +

                StringUtils.trimToEmpty(middleName);

    }

   

    /**
     * Safely compare two dates, return the least of 2 dates
     * 
     * @param a - input date
     * @param b - input date
     * @return
     */
    public static Date leastOfTwoDates(final Date a, final Date b) {
        if (a == null) {
            return b;
        }
        if (b == null) {
            return a;
        }
        return a.before(b) ? a : b;
    }

    /**
     * Safely compare two dates, return the Max of 2 dates
     * 
     * @param a - input date
     * @param b - input date
     * @return
     */
    public static Date maxOfTwoDates(final Date a, final Date b) {
        if (a == null) {
            return b;
        }
        if (b == null) {
            return a;
        }
        return a.before(b) ? b : a;
    }

    /**
     * Safely compare two dates, return if both are valid and equal on day boundary
     * 
     * @param a - input date =
     * @param b - input date
     * @return
     */
    public static boolean equalDates(final Date a, final Date b) {
        if (null == a && null == b) {
            return false;
        }
        if ((null == a) ^ (null == b)) {
            return false;
        }
        return DateUtilityHelper.removeTime(a).equals(DateUtilityHelper.removeTime(b));
    }

    public static <T> T recordExistInDB(final T data, final String message) {

        if (null == data) {
            throw new PTABException(NOT_FOUND, new ErrorPayload("No " + message + " Data In The System"));
        }
        return data;
    }

    /**
     * Helper method used in controller to check if a particular data collection empty or not.
     *
     * @param data - collections for which error occurred
     * @param type - entity type
     * @return
     */
    public static <T> Collection<T> safeCollection(final Collection<T> data, final String message) {

        if (CollectionUtils.isEmpty(data)) {
            throw new PTABException(NOT_FOUND, new ErrorPayload("No " + message + " Data In The System"));
        }
        return data;
    }

    public static <T> T validateRequest(final T data, final String message) {

        if (null == data) {
            throw new PTABException(BAD_REQUEST, new ErrorPayload(message));
        }
        return data;
    }

    /**
     * Method is used to validate Lock Control Number.if the requested lock control number doesn't match with existing lock
     * control number in the data base then it will throw 409 error.
     * 
     * @param inputLockControlNumber - input lock control number cannot be null.
     * @param existingLockControlNumber - existing lock control number in the data base
     * @return- Throws 409 if record not found
     */
    public static void safeLockControlNumber(final BigDecimal inputLockControlNumber,
            final BigDecimal existingLockControlNumber) {
        if (!inputLockControlNumber.equals(existingLockControlNumber)) {
            throw new PTABException(CONFLICT,
                    new ErrorPayload("Someone Has Updated The Record.Please Refersh The Page And Get The Latest Data."));
        }
    }
}
