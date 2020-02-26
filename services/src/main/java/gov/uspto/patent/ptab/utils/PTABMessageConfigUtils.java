package gov.uspto.patent.ptab.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * This class is used to read property file entries from static class
 *
 * @author 2020 Development Team
 *
 */
@Service
public final class PTABMessageConfigUtils {

    private static PTABMessageUtil ptabMessageUtil;

    /**
     * Constructor to hand over the bean to static field
     */
    @Autowired
    private PTABMessageConfigUtils(final PTABMessageUtil ptabMessageUtil) {
        PTABMessageConfigUtils.ptabMessageUtil = ptabMessageUtil;
    }

    /**
     * This class is used to get records found message
     *
     * @param key - property entry for the error message
     * @param object - additional error messages
     * @return
     */
    public static String getMessage(final String messageKey, final Object[] object) {
        return ptabMessageUtil.getMessage(messageKey, object);
    }

}