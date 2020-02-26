package gov.uspto.patent.ptab;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * The main entry point and configuration of the application.The Spring
 * ApplicationContext configuration is triggered by the @SpringBootApplication
 * annotation and automatically pulls in all spring elements in this package and
 * its sub packages.
 *
 * @author 2020 Development Team
 */
@SpringBootApplication(exclude = { HibernateJpaAutoConfiguration.class })
@EnableTransactionManagement
@EnableScheduling
@EnableJpaRepositories("gov.uspto.patent.ptab.repository")
@PropertySource("classpath:application.properties")
public class PtabServicesApplication extends SpringBootServletInitializer {

	@Autowired
	private Environment env;

	/**
	 * The SpringApplication class provides a convenient way to bootstrap a Spring
	 * application that will be started from a main method
	 * 
	 * @param args - arguments
	 */
	public static void main(final String[] args) {
		SpringApplication.run(PtabServicesApplication.class, args);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * org.springframework.boot.web.servlet.support.SpringBootServletInitializer
	 * #configure(org.springframework.boot.builder.SpringApplicationBuilder)
	 */
	@Override
	protected SpringApplicationBuilder configure(final SpringApplicationBuilder application) {
		return application.sources(PtabServicesApplication.class);
	}

	/*
	 * @Bean public DataSource dataSource() { JndiDataSourceLookup dataSourceLookup
	 * = new JndiDataSourceLookup(); DataSource dataSource =
	 * dataSourceLookup.getDataSource(env.getProperty("UIDemo.DS.NAME")); return
	 * dataSource; }
	 */

}
