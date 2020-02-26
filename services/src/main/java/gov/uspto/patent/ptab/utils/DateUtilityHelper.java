package gov.uspto.patent.ptab.utils;

import static gov.uspto.patent.ptab.utils.PTABConstants.ONE;
import static gov.uspto.patent.ptab.utils.PTABConstants.ONE_THOUSAND;
import static gov.uspto.patent.ptab.utils.PTABConstants.ZERO;
import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

import org.apache.commons.lang3.StringUtils;

/**
 * Simple date utility for epoch to string and reverse
 *
 * @author 2020 Development Team
 *
 */
public final class DateUtilityHelper {

    private static final String DT_FORMAT = "yyyy-MM-dd HH:mm:ss";
    private static final int OPEN_END_DATE = 9999;
    private static final int DATE = 31;
    private static final String DATE_FORMAT_FAILURE_MSG = "date.format.failure.message";
    private static final String CONST_EMPTY_SPACE = " ";

    private DateUtilityHelper() {

    }

    /**
     * Converts long time-stamp to string based on the provided format
     *
     * @param timeStamp - Input time-stamp.
     * @return
     */
    private static String longToString(final long timeStamp) {
        return new SimpleDateFormat(DT_FORMAT).format(timeStamp * ONE_THOUSAND);
    }

    /**
     * Converts date to string based on the provided format
     *
     * @param inputDate - takes date.
     * @param inputFormat takes input date format.
     * @return
     */
    public static String convertDateToString(final Date inputDate, final String inputFormat) {
        String date = CONST_EMPTY_SPACE;
        if (null != inputDate && StringUtils.isNotBlank(inputFormat)) {
            final SimpleDateFormat sdf = new SimpleDateFormat(inputFormat);
            date = sdf.format(inputDate);
        }
        return date;
    }

    /**
     * Converts long to a specified date format
     *
     * @param timeStamp - cannot be empty
     * @return
     */
    public static Date longToDate(final long timeStamp) {

        try {

            return new SimpleDateFormat(DT_FORMAT).parse(longToString(timeStamp));

        } catch (final ParseException e) {
            throw new PTABException(INTERNAL_SERVER_ERROR,
                    new ErrorPayload(PTABMessageConfigUtils.getMessage(DATE_FORMAT_FAILURE_MSG, null)), e);
        }
    }

    /**
     * Converts long to a specified date format(MM/DD/YYYY HH:MM:SS: am/pm zone)
     *
     * @param timeStamp - cannot be empty
     * @return
     */
    public static String longToZone(final long timeStamp) {
        final SimpleDateFormat formatter = new SimpleDateFormat("MM/dd/yyyy hh:mm:ss aa zzz");
        return formatter.format(timeStamp);
    }

    /**
     * This method removed the the time from the input date object
     *
     * @param date - Input date with or without time
     * @return
     */
    public static Date removeTime(final Date date) {
        final Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.set(Calendar.HOUR_OF_DAY, ZERO);
        cal.set(Calendar.MINUTE, ZERO);
        cal.set(Calendar.SECOND, ZERO);
        cal.set(Calendar.MILLISECOND, ZERO);
        return cal.getTime();
    }

    /**
     * Converts Date to long
     *
     * @param date - Util date
     * @return
     */
    public static Long convertDateToLong(final Date date) {
        return convertObjectDateToLong(date);
    }

    /**
     * This method converts the input String date to long
     *
     * @param dateObject - Date as Object
     * @return
     */
    private static Long convertObjectDateToLong(final Object dateObject) {
        Long returnDateLong = null;
        if (null != dateObject) {
            final Date minDate = new GregorianCalendar(ONE, Calendar.JANUARY, ONE).getTime();
            final Date maxDate = new GregorianCalendar(OPEN_END_DATE, Calendar.DECEMBER, DATE).getTime();
            final Date dateToCompare = (Date) dateObject;
            if (!minDate.equals(dateToCompare) && !maxDate.equals(dateToCompare)) {
                returnDateLong = dateToCompare.getTime() / ONE_THOUSAND;
            }
        }
        return returnDateLong;
    }

    /**
     * Method will convert given object to Date.
     *
     * @param result - Object from hibernate query result
     * @return - converted input object to Date
     */
    public static Date convertToDate(final Object result) {
        return null != result ? (Date) result : null;
    }

    /**
     * Converts long to a specified date format
     *
     * @param timeStamp - cannot be empty
     * @return
     */
    public static Date msToDate(final long timeStamp) {

        try {

            return new SimpleDateFormat(DT_FORMAT).parse(longToStringinMs(timeStamp));

        } catch (final ParseException e) {
            throw new PTABException(INTERNAL_SERVER_ERROR,
                    new ErrorPayload(PTABMessageConfigUtils.getMessage(DATE_FORMAT_FAILURE_MSG, null)), e);
        }
    }

    /**
     * Converts long time-stamp to string based on the provided format
     *
     * @param timeStamp - Input time-stamp.
     * @return
     */
    public static String longToStringinMs(final long timeStamp) {
        return new SimpleDateFormat(DT_FORMAT).format(timeStamp);
    }

    /**
     * Converts long to a specified date format
     *
     * @param timeStamp - time stamp
     * @param dateFormat - date format
     * @return
     */
    public static Date longToDate(final long timeStamp, final String dateFormat) {

        try {
            return new SimpleDateFormat(dateFormat).parse(longToString(timeStamp));

        } catch (final ParseException e) {
            throw new PTABException(INTERNAL_SERVER_ERROR,
                    new ErrorPayload(PTABMessageConfigUtils.getMessage(DATE_FORMAT_FAILURE_MSG, null)), e);
        }
    }

    /**
     * This method is used to retrieve start or end date of the current week
     * 
     * @param timeStamp - time stamp
     * @param position - calendar filed value
     * @param dateFormat - date format
     * @return
     */
    public static Date firstOrLastDayOfWeek(final long timeStamp, final int position, final String dateFormat) {

        final Calendar calendar = Calendar.getInstance();
        calendar.setTime(longToDate(timeStamp, dateFormat));
        calendar.set(Calendar.DAY_OF_WEEK, position);
        return calendar.getTime();
    }

    /**
     * This method is to calculate end of day by converting date into milliseconds
     * 
     * @param date - date
     * @return
     */
    public static Date endOfTheDay(final long date) {

        final long today = date;
        final Calendar cal = Calendar.getInstance();
        cal.setTime(new Date(today));
        return getEndOfDay(new Date(today), cal);
    }

    /**
     * This method is to calculate end of day by converting date into milliseconds
     */
    private static Date getEndOfDay(final Date today, final Calendar cal) {
        final Date dayLocal = today;
        cal.setTime(dayLocal);
        cal.set(Calendar.HOUR_OF_DAY, cal.getMaximum(Calendar.HOUR_OF_DAY));
        cal.set(Calendar.MINUTE, cal.getMaximum(Calendar.MINUTE));
        cal.set(Calendar.SECOND, cal.getMaximum(Calendar.SECOND));
        cal.set(Calendar.MILLISECOND, cal.getMaximum(Calendar.MILLISECOND));

        return cal.getTime();
    }
    
    /**
     * This method will take the date and converts into specified format
     *
     * @param date - input date cannot be null
     * @param format - valid date format
     * @return
     */
    public static String convertDateToStringFormat(final Date date, final String format) {
        String formattedDt;
        final DateFormat dateFormat = new SimpleDateFormat(format);
        formattedDt = dateFormat.format(date);
        return formattedDt;
    }

    /**
     * This method is used to convert Epoch Date to Date
     * 
     * @param date
     * @return
     */
    public static Date getDateFromEpochDate(long date) {
        Instant instantDate = Instant.ofEpochMilli(date);
        LocalDateTime localDate = instantDate.atZone(ZoneId.systemDefault()).toLocalDateTime();
        return Date.from(localDate.atZone(ZoneId.systemDefault()).toInstant());
    }

    /**
     * This method is used to add days to the given startDate
     * 
     * @param startDate
     * @return
     */
    public static Date addDays(Date startDate) {
        Date date;
        Calendar cal = Calendar.getInstance();
        cal.setTime(startDate);
        cal.add(Calendar.DATE, 1);
        date = cal.getTime();
        return date;
    }
    
    /**
     * This method is used to add days to the given startDate
     * 
     * @param startDate
     * @return
     */
    public static Date addOneYearToDate(Date startDate) {
        Date date;
        Calendar calenderDate = Calendar.getInstance();
        calenderDate.setTime(startDate);
        calenderDate.add(Calendar.YEAR, 1);
        date = calenderDate.getTime();
        return date;
    }
}
