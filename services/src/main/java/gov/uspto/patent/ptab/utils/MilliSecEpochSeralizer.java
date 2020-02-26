package gov.uspto.patent.ptab.utils;

import java.io.IOException;
import java.util.Date;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

/**
 * This class is used for Serialize Epoch Date
 *
 * @author 2020 Development Team
 *
 */
public class MilliSecEpochSeralizer extends JsonSerializer<Date> {

    /**
     * This method is used for serialization epoch date
     *
     * @param utilDate - Date
     * @param jsonGenerator - JsonGenerator
     * @param serializerProvider - SerializerProvider
     * @throws IOException
     */
    @Override
    public void serialize(final Date utilDate, final JsonGenerator jsonGenerator,
            final SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeNumber(utilDate.getTime());
    }

}
