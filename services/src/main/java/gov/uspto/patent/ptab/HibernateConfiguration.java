package gov.uspto.patent.ptab;

import java.io.IOException;
import java.util.Properties;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.ehcache.EhCacheCacheManager;
import org.springframework.cache.ehcache.EhCacheManagerFactoryBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.core.io.support.ResourcePatternUtils;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.jdbc.datasource.lookup.DataSourceLookupFailureException;
import org.springframework.jdbc.datasource.lookup.JndiDataSourceLookup;
import org.springframework.orm.hibernate5.HibernateTransactionManager;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import lombok.extern.slf4j.Slf4j;

/**
 * Hibernate ORM configuration for SPRING BOOT to be able to connect database
 *
 * @author 2020 Development Team
 *
 */
@Slf4j
@Configuration
@EnableTransactionManagement
@EnableCaching
public class HibernateConfiguration {

    private static final String HIBERNATE_CACHE_INFINISPAN_STATISTICS = "hibernate.cache.infinispan.statistics";
    private static final String HIBERNATE_CACHE_USE_QUERY_CACHE = "hibernate.cache.use_query_cache";
    private static final String HIBERNATE_CACHE_REGION_FACTORY_CLASS = "hibernate.cache.region.factory_class";
    private static final String HIBERNATE_CACHE_USE_SECOND_LEVEL_CACHE = "hibernate.cache.use_second_level_cache";
    private static final String HIBERNATE_SHOW_SQL = "hibernate.show_sql";
    private static final String HIBERNATE_DIALECT = "hibernate.dialect";
    private static final String PTAB_DATASOURCES = "java:jboss/datasources/PTAB";

    @Autowired
    private ResourceLoader resourceLoader;

    @Value("${hibernate.cache.use_second_level_cache}")
    private String useSecondLevelCache;

    @Value("${hibernate.cache.region.factory_class}")
    private String factoryClass;

    @Value("${hibernate.cache.use_query_cache}")
    private String useQueryCache;

    @Value("${hibernate.cache.infinispan.statistics}")
    private String infinispanStatistics;

    @Value("${spring.datasource.driver-class-name}")
    private String driverName;

    @Value("${spring.datasource.url}")
    private String dataSourceUrl;

    @Value("${spring.datasource.username}")
    private String userName;

    @Value("${spring.datasource.password}")
    private String password;

    @Value("${hibernate.dialect}")
    private String dialect;

    @Value("${hibernate.show_sql}")
    private String showSql;

    @Value("${entitymanager.packagesToScan}")
    private String packagesToScan;

    @Value("${hbm.classpath.xml}")
    private String hbmClassPathXml;

    @Value("${classpath.resource}")
    private String classpathResource;

    /**
     * Data source configuration. Externalized into properties file.
     *
     * @return
     */
    @Bean
    public DataSource dataSource() {
        DataSource dataSource;
        try {
			/*
			 * final JndiDataSourceLookup dataSourceLookup = new JndiDataSourceLookup();
			 * dataSource = dataSourceLookup.getDataSource(PTAB_DATASOURCES)
			 */;
			 final DriverManagerDataSource localDataSource = new DriverManagerDataSource();

	            localDataSource.setDriverClassName(driverName);
	            localDataSource.setUrl(dataSourceUrl);
	            localDataSource.setUsername(userName);
	            localDataSource.setPassword(password);
	            dataSource = localDataSource;
        
        }
        
        catch (final DataSourceLookupFailureException e) {
            log.error("DataSourceLookupFailure ", e);
            final DriverManagerDataSource localDataSource = new DriverManagerDataSource();

            localDataSource.setDriverClassName(driverName);
            localDataSource.setUrl(dataSourceUrl);
            localDataSource.setUsername(userName);
            localDataSource.setPassword(password);
            dataSource = localDataSource;
        }
        return dataSource;

    }

    /**
     * Session factory for creating an instance of session with appropriate hbm files and the dialects,show sql in console
     * etc.
     *
     * @return
     */
    @Bean(name = "entityManagerFactory")
    public LocalSessionFactoryBean sessionFactory() {
        final LocalSessionFactoryBean sessionFactory = new LocalSessionFactoryBean();
        sessionFactory.setDataSource(dataSource());
        sessionFactory.setPackagesToScan(packagesToScan);
        sessionFactory.setMappingLocations(loadResources());
        final Properties hibernateProperties = new Properties();
        hibernateProperties.put(HIBERNATE_DIALECT, dialect);
        hibernateProperties.put(HIBERNATE_SHOW_SQL, showSql);
        hibernateProperties.put(HIBERNATE_CACHE_USE_SECOND_LEVEL_CACHE, useSecondLevelCache);
        hibernateProperties.put(HIBERNATE_CACHE_REGION_FACTORY_CLASS, factoryClass);
        hibernateProperties.put(HIBERNATE_CACHE_USE_QUERY_CACHE, useQueryCache);
        hibernateProperties.put(HIBERNATE_CACHE_INFINISPAN_STATISTICS, infinispanStatistics);

        sessionFactory.setHibernateProperties(hibernateProperties);

        return sessionFactory;
    }

    /**
     * Load all Hibernate XML configuration files
     *
     * @return
     */
    public Resource[] loadResources() {
        Resource[] resources = null;
        try {
            resources = ResourcePatternUtils.getResourcePatternResolver(resourceLoader).getResources(hbmClassPathXml);
        } catch (final IOException e) {
            log.error("Exception during Hibernate Package Scan: ", e);
        }
        return resources;
    }

    /**
     * Hibernate transaction manager wired for the session factory
     *
     * @return
     */
    @Bean
    public HibernateTransactionManager transactionManager() {
        final HibernateTransactionManager transactionManager = new HibernateTransactionManager();
        transactionManager.setSessionFactory(sessionFactory().getObject());
        return transactionManager;
    }

    @Bean
    public CacheManager cacheManager() {
        return new EhCacheCacheManager(ehCacheCacheManager().getObject());
    }

    /**
     * Hibernate cache wired
     * 
     * @return
     */
    @Bean
    public EhCacheManagerFactoryBean ehCacheCacheManager() {
        final EhCacheManagerFactoryBean cmfb = new EhCacheManagerFactoryBean();
        cmfb.setConfigLocation(new ClassPathResource(classpathResource));
        cmfb.setShared(true);
        return cmfb;
    }
}