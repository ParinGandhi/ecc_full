package gov.uspto.patent.ptab.service;

import static gov.uspto.patent.ptab.utils.PTABServiceUtils.validateAndThrowExceptionWithMsg;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import gov.uspto.patent.ptab.domain.CacheDetails;
import net.sf.ehcache.CacheManager;
import net.sf.ehcache.config.CacheConfiguration;

@Service
public class CacheService {

    private static final String CACHE_NAME_INVALID = "cache.name.invalid";

    @Autowired
    private CacheManager cacheManager;

    /**
     * This method will Clear all the Cache
     */

    public void clearAllCache() {
        cacheManager.clearAll();
    }

    /**
     * This method will throw the Validation error for Invalid Cache Name
     * 
     * @param cacheName
     */

    public void clearCache(final String cacheName) {

        validateAndThrowExceptionWithMsg(!cacheManager.cacheExists(cacheName), CACHE_NAME_INVALID, HttpStatus.BAD_REQUEST);
        cacheManager.getCache(cacheName).flush();

    }

    /**
     * This method will Update the Valid Cache and throw a validation Error if Invalid Cache is Requested
     * 
     * @param cacheDetails
     */

    public void updateCache(final CacheDetails cacheDetails) {
        validateAndThrowExceptionWithMsg(!cacheManager.cacheExists(cacheDetails.getName()), CACHE_NAME_INVALID,
                HttpStatus.BAD_REQUEST);

        final CacheConfiguration config = cacheManager.getCache(cacheDetails.getName()).getCacheConfiguration();
        config.setTimeToIdleSeconds(cacheDetails.getTimeToIdleSeconds());
        config.setTimeToLiveSeconds(cacheDetails.getTimeToLiveSeconds());

    }

    /**
     * This method will give you the details of the CacheDetailList
     * 
     * @return
     */

    public List<CacheDetails> cacheDetails() {
        final List<CacheDetails> cacheDetailsList = new ArrayList<>();
        for (final String cache : cacheManager.getCacheNames()) {

            final CacheConfiguration config = cacheManager.getCache(cache).getCacheConfiguration();
            final CacheDetails cacheDetails = new CacheDetails();
            cacheDetails.setName(cache);
            cacheDetails.setTimeToIdleSeconds(config.getTimeToIdleSeconds());
            cacheDetails.setTimeToLiveSeconds(config.getTimeToLiveSeconds());
            cacheDetailsList.add(cacheDetails);
        }

        return cacheDetailsList;
    }
}
