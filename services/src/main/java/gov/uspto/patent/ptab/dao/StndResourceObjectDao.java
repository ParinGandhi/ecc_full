package gov.uspto.patent.ptab.dao;

import java.math.BigDecimal;
import java.sql.Clob;
import java.util.List;

import org.apache.commons.lang3.math.NumberUtils;
import org.hibernate.query.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import gov.uspto.patent.ptab.entities.CodeReferenceEntity;
import gov.uspto.patent.ptab.entities.StndResourceObjectEntity;
import gov.uspto.patent.ptab.repository.CodeReferenceRepository;
import gov.uspto.patent.ptab.repository.StndResourceObjectRepository;
import lombok.extern.slf4j.Slf4j;

/**
 * DAO Implementation for StndResourceObject
 *
 * @author 2020 development team
 *
 */
@Slf4j
@Component
@SuppressWarnings({ "unchecked", "rawtypes" })
public class StndResourceObjectDao {

	private static final String PRIVILEGES_INFO = "Normal Privileges";
	private static final String RESOURSE_OBJECT_INFO = "Resourse Object Id";
	private static final String APPLICATION_USER_ID = "applicationUserId";

	@Autowired
	private StndResourceObjectRepository stndResourceObjectRepository;

	@Autowired
	private SessionFactory sessionFactory;

	@Autowired
	private CodeReferenceRepository codeReferenceRepository;

	/**
	 * Initializing the session factory which will be used for all transactions
	 * within business layer
	 */
	private Session currentSession() {
		return sessionFactory.getCurrentSession();

	}

	/**
	 * This method is used to fetch configuration for resource identifier
	 *
	 * @param resourceObjectId- unique input resource identifier
	 * @return
	 */
	public Object fetchStndResourceObject(final String resourceObjectId) {
		log.info("Dao call for convertColumnJsonToWidgetColumn method");
		Object configDoc = null;
		if (null != resourceObjectId) {
			final StndResourceObjectEntity stndResourceObjectEntity = stndResourceObjectRepository
					.findOne(new BigDecimal(resourceObjectId));
			if (null != stndResourceObjectEntity) {
				configDoc = stndResourceObjectEntity.getConfigDoc();
			}
		}
		return configDoc;
	}

	/**
	 * This method is used to get the user privilages
	 *
	 * @param beNo - unique roleid to be validated
	 * @return
	 */
	public Clob fetchUserPrivilegesData(final BigDecimal roleid) {
		log.info("Dao call for fetchUserPrivilegesData method");
		final Query query = currentSession().getNamedQuery("privilagesData");
		query.setParameter("roleid", NumberUtils.createInteger(roleid.toString()));
		Clob data = null;
		if (query.uniqueResult() != null) {
			data = (Clob) query.uniqueResult();
		} else {
			final Query queryData = currentSession().getNamedQuery("privilagesNormalData");
			final CodeReferenceEntity codeReferenceEntity = codeReferenceRepository
					.findByTypeCdAndDescriptionTx(PRIVILEGES_INFO, RESOURSE_OBJECT_INFO);
			queryData.setParameter("roleid", NumberUtils.createInteger(codeReferenceEntity.getValueTx()));
			data = (Clob) queryData.uniqueResult();
		}
		return data;
	}

	/**
	 * This method is used to get the user AccessiblePrivilages
	 *
	 * @param applicationUserId - unique applicationUserId to be validated
	 * @return
	 */
	public List<String> fetchAccessiblePrivilages(final String applicationUserId) {
		log.info("Dao call for fetchAccessiblePrivilages method");
		final Query query = currentSession().getNamedQuery("accessiblePrivilages");
		query.setParameter(APPLICATION_USER_ID, applicationUserId);
		return query.list();
	}

}