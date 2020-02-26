package gov.uspto.patent.ptab.utils;

import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Arrays;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.ByteArrayHttpMessageConverter;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import lombok.extern.slf4j.Slf4j;

/**
 * This class is used to call external rest service and get the response
 * 
 * @author 2020 development team
 *
 */
@Slf4j
@Component
public class RestServiceUtils {

    private static final String STR_ONE = "1";
    private static final String HEADER_VALUE_APPL_JSON = "application/json";
    private static final String HEADER_NAME_ACCEPT = "Accept";

    /**
     * This is a common method to call external REST service. Returns null if the call fails
     *
     * @param serviceEndPointUrl - URL of the service
     * @param                    applicationIdentifierQuery- build url using ApplicationIdentifierQuery members
     * @param responseType       response object class
     * @return
     */
    public <B, R> ResponseEntity<R> callExternalServiceURL(final String serviceUrl, final B requestBody,
            final HttpMethod callType, final Class<R> responseType) {
        final HttpHeaders headers = new HttpHeaders();
        headers.add(HEADER_NAME_ACCEPT, HEADER_VALUE_APPL_JSON);
        headers.setContentType(MediaType.APPLICATION_JSON);
        return invokeWebService(serviceUrl, requestBody, callType, responseType, headers);

    }

    /**
     * This is a common method to call external REST service. Returns null if the call fails
     *
     * @param serviceEndPointUrl - URL of the service
     * @param                    applicationIdentifierQuery- build url using ApplicationIdentifierQuery members
     * @param responseType       response object class
     * @param headers            http headers
     * @return
     */
    public <B, R> ResponseEntity<R> invokeWebService(final String serviceUrl, final B requestBody, final HttpMethod callType,
            final Class<R> responseType, final HttpHeaders headers) {

        final HttpEntity<B> request = requestBody == null ? new HttpEntity<>(headers) : new HttpEntity<>(requestBody, headers);

        final RestTemplate restTemplate = new RestTemplate();
        restTemplate.setErrorHandler(new PTABExternalServiceErrorHandler());

        log.debug("request: serviceUrl:{} ; callType:{}", serviceUrl, callType);

        final ResponseEntity<R> response = restTemplate.exchange(URI.create(serviceUrl), callType, request, responseType);

        log.debug("response:{}", response);

        return response;
    }

    /**
     * This method is used to download file from URL
     * 
     * @param url            - URL location of file to be downloaded
     * @param                fileName- name of file to be downloaded
     * @param localDirectory - local file path
     * @return
     */
    public boolean downloadFileFromURL(final String url, final String localFileName, final String localDirectory) {
        boolean success = false;
        final RestTemplate restTemplate = new RestTemplate();
        restTemplate.getMessageConverters().add(new ByteArrayHttpMessageConverter());

        final HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Arrays.asList(MediaType.ALL));

        final HttpEntity<String> entity = new HttpEntity<>(headers);
        final ResponseEntity<byte[]> response = restTemplate.exchange(url, HttpMethod.GET, entity, byte[].class, STR_ONE);

        if (response.getStatusCode() == HttpStatus.OK) {
            try {
                final String fileAbsolutePath = localDirectory + localFileName;
                Files.write(Paths.get(fileAbsolutePath), response.getBody());
                success = true;
            } catch (final IOException e) {
                log.info("Exception while writing the file :{}; exception:{}", localFileName, e);
            }
        }

        return success;
    }
}