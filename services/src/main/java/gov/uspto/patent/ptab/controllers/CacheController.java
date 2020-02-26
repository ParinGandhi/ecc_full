package gov.uspto.patent.ptab.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import gov.uspto.patent.ptab.domain.CacheDetails;
import gov.uspto.patent.ptab.service.CacheService;

@RestController
@RequestMapping(value = "/cache")
public class CacheController {

    @Autowired
    private CacheService cacheService;

    @GetMapping(value = "/clear-all")
    public void clearAllCache() {
        cacheService.clearAllCache();
    }

    @GetMapping(value = "/clear")

    public void clearCache(final String cacheName) {
        cacheService.clearCache(cacheName);
    }

    @PutMapping

    public void updateCache(final CacheDetails cacheDetails) {
        cacheService.updateCache(cacheDetails);
    }

    @GetMapping

    public List<CacheDetails> cacheDetails() {
        return cacheService.cacheDetails();
    }

}
