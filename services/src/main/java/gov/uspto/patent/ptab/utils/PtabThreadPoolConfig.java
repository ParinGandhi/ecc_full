package gov.uspto.patent.ptab.utils;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import javax.annotation.PreDestroy;
import java.util.concurrent.ExecutorService;

/**
 * For configuring the thread pool.
 */
@Configuration
@Slf4j
class PtabThreadPoolConfig {

    private static final String POOL_NAME = "Ptab-ThreadPool";

    private ThreadPoolTaskExecutor executor;

    /**
     * These arguments can be configured in Spring Boot properties. They can also be modified runtime through JMX.
     */
    @Bean
    public ExecutorService eligibilityCheckThreadPool(
            @Value("${pti.ti-eligibility-check.core-pool-size:100}") int corePoolSize,
            @Value("${pti.ti-eligibility-check.max-pool-size:200}") int maxPoolSize,
            @Value("${pti.ti-eligibility-check.queue-capacity:10000}") int queueCapacity,
            @Value("${pti.ti-eligibility-check.keep-alive-seconds:360}") int keepAliveSeconds) {

        log.info("{} configuration: corePoolSize={}, maxPoolSize={}, queueCapacity={}, keepAliveSeconds={}",
                POOL_NAME, corePoolSize, maxPoolSize, queueCapacity, keepAliveSeconds);

        executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(corePoolSize);
        executor.setMaxPoolSize(maxPoolSize);
        executor.setQueueCapacity(queueCapacity);
        executor.setKeepAliveSeconds(keepAliveSeconds);
        executor.setThreadGroupName(POOL_NAME);
        executor.initialize();
        return executor.getThreadPoolExecutor();
    }

    @PreDestroy
    public void shutdownExecutor() {
        if (executor != null) {
            log.info("Shutting down {}", POOL_NAME);
            executor.shutdown();
            log.info("{} shut down successfully.", POOL_NAME);
        }
    }

}
