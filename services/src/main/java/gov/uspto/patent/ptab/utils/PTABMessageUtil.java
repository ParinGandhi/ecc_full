package gov.uspto.patent.ptab.utils;

import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.MessageSourceAware;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;

/**
 * This class is used to read property file entries
 * 
 * @author 2020 Development Team
 *
 */
@Service
@PropertySource("classpath:ptab_application_messages.properties")
public class PTABMessageUtil implements MessageSourceAware {

    @Autowired
    private MessageSource messageSource;

    /*
     * (non-Javadoc)
     * 
     * @see org.springframework.context.MessageSourceAware#setMessageSource(org. springframework.context.MessageSource)
     */
    @Override
    public void setMessageSource(final MessageSource messageSource) {
        this.messageSource = messageSource;
    }

    /**
     * This class is used to get records found message
     * 
     * @param key - property entry for the error message
     * @param object - additional error messages
     * @return
     */
    public String getMessage(final String key, final Object[] object) {
        return messageSource.getMessage(key, object, Locale.getDefault());
    }

}
