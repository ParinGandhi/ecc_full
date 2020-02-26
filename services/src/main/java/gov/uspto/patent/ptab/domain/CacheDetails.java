package gov.uspto.patent.ptab.domain;

import lombok.Data;

@Data
public class CacheDetails {

    private String name;
    private Long timeToIdleSeconds;
    private Long timeToLiveSeconds;
}
