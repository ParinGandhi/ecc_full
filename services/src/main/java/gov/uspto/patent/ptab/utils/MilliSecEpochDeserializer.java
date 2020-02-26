package gov.uspto.patent.ptab.utils;

import java.io.IOException;
import java.util.Date;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

/**
 * This class is used for deserialize Epoch Date
 *
 * @author 2020 Development Team
 *
 */
public class MilliSecEpochDeserializer extends JsonDeserializer<Date> {

    /**
     * This method is used for deserialization
     *
     * @param jsonParser - JsonParser
     * @param deserializationContext - DeserializationContext
     * @return Date - returns date after deserialization
     * @throws IOException
     */
    @Override
    public Date deserialize(final JsonParser jsonParser, final DeserializationContext deserializationContext)
            throws IOException {
        return new Date(Long.parseLong(jsonParser.getText()));
    }

}
