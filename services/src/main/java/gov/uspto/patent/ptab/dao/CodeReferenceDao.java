package gov.uspto.patent.ptab.dao;

import static gov.uspto.patent.ptab.utils.PTABConstants.EMPTY_STR;
import static gov.uspto.patent.ptab.utils.PTABConstants.ZERO;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.collections4.CollectionUtils;
import org.hibernate.query.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Repository;

import gov.uspto.patent.ptab.domain.CodeReferenceLookup;
import gov.uspto.patent.ptab.entities.CodeReferenceEntity;
import gov.uspto.patent.ptab.entities.CodeReferenceId;
import gov.uspto.patent.ptab.repository.CodeReferenceRepository;
import lombok.extern.slf4j.Slf4j;

/**
 * DAO Implementation for CodeReference
 *
 * @author 2020 development team
 *
 */
@Slf4j
@Repository
@SuppressWarnings("rawtypes")
public class CodeReferenceDao {

	private static final String OPSGBPSERVICES_URL = "OPSGBPSERVICES_URL";

	@Autowired
	private CodeReferenceRepository codeReferenceRepository;

	@Autowired
	private SessionFactory sessionFactory;

	/**
	 * Initializing the session factory which will be used for all transactions
	 * within business layer
	 */
	private Session currentSession() {
		return sessionFactory.getCurrentSession();

	}

	/**
	 * This method is used to get first code reference value based on typeCode
	 *
	 * @param typeCode - input type code
	 * @return
	 */
	public String getFirstvalueCodeRef(final String typeCode) {
		log.info("Dao call for getFeedURL method");
		final List<CodeReferenceEntity> listCodeReferenceEntity = codeReferenceRepository
				.findAllByTypeCdOrderByValueTx(typeCode);
		return CollectionUtils.isEmpty(listCodeReferenceEntity) ? EMPTY_STR
				: listCodeReferenceEntity.get(ZERO).getValueTx();
	}

	/**
	 * This method is used to get codeReferenceList based on typeCode
	 *
	 * @param typeCode - input type code
	 * @return
	 */
	public String getFirstDescCodeRef(final String typeCode) {
		log.info("Dao call for previewFilePath method");
		final List<CodeReferenceEntity> listCodeReferenceEntity = codeReferenceRepository
				.findAllByTypeCdOrderByValueTx(typeCode);
		return CollectionUtils.isEmpty(listCodeReferenceEntity) ? EMPTY_STR
				: listCodeReferenceEntity.get(ZERO).getDescriptionTx();
	}

	/**
	 * This method is used to fetch the description using ValueTx
	 * 
	 * @param valueTx - input Value Text
	 * @return
	 */
	public String fetchSingleDescriptionByValueTx(final String valueTx) {
		log.info("Dao call for retrieveMetaDataByForApplNumbers method");
		final List<CodeReferenceEntity> listCodeReferenceEntity = codeReferenceRepository
				.findAllByValueTxOrderByValueTx(valueTx);

		return CollectionUtils.isEmpty(listCodeReferenceEntity) ? EMPTY_STR
				: listCodeReferenceEntity.get(ZERO).getDescriptionTx();
	}

	/**
	 * fetch code_reference for tasks
	 *
	 * @param valueTx  - input Value Text
	 * @param typeCode - input type code
	 * @return
	 */
	@Cacheable(value = "findDescriptionByTypeCodeAndValueTx")
	public String findDescriptionByTypeCodeAndValueTx(final String typeCd, final String valueTx) {

		final CodeReferenceEntity codeReferenceEntity = codeReferenceRepository
				.findOne(new CodeReferenceId(typeCd, valueTx));
		return null != codeReferenceEntity ? codeReferenceEntity.getDescriptionTx() : null;
	}

	/**
	 * This method is used to find value by type code and description
	 * 
	 * @param typeCd      - input typecode
	 * @param description - input description
	 * @return
	 */
	public String findValueByTypeCodeAndDescription(final String typeCd, final String description) {

		final CodeReferenceEntity codeReferenceEntity = codeReferenceRepository.findAllByTypeCdAndDescriptionTx(typeCd,
				description);
		return null != codeReferenceEntity ? codeReferenceEntity.getValueTx() : null;
	}

	/**
	 * This method is used to fetch descriptiontext status from the database
	 *
	 * @param typeCode - input type code
	 * @return
	 */
	public String fetchStndAssignmentType(final String typeCode) {
		log.info("Dao call for setStndAssignmentType method");
		final Query qry = currentSession().getNamedQuery("getValueAndDescriptionByType");
		qry.setParameter("value_tx", typeCode);
		return (String) qry.uniqueResult();

	}

	/**
	 * This method is used to fetch the description using typeCode
	 * 
	 * @param typeCodeList - unique list of typeCode
	 * @return
	 */
	public List<CodeReferenceLookup> fetchCodeReferenceByTypeCodeIn(final List<String> typeCodeList) {
		log.info("Dao call for fetchZoneLayoutConfigs method");
		final List<CodeReferenceEntity> listCodeReferenceEntity = codeReferenceRepository.findByTypeCdIn(typeCodeList);
		List<CodeReferenceLookup> listCodeReferenceLookup = null;

		if (CollectionUtils.isNotEmpty(listCodeReferenceEntity)) {
			listCodeReferenceLookup = new ArrayList<>();
			for (final CodeReferenceEntity codeReferenceEntity : listCodeReferenceEntity) {
				final CodeReferenceLookup codeReferenceLookup = new CodeReferenceLookup();
				codeReferenceLookup.setValueText(codeReferenceEntity.getValueTx());
				codeReferenceLookup.setDescriptionText(codeReferenceEntity.getDescriptionTx());
				codeReferenceLookup.setTypeCode(codeReferenceEntity.getTypeCd());
				listCodeReferenceLookup.add(codeReferenceLookup);
			}
		}
		return listCodeReferenceLookup;
	}

	/**
	 * This method is used to fetch all description using typeCode
	 * 
	 * @param typeCode - unique typeCode
	 * @return
	 */
	public List<String> fetchAllDescriptionByTypeCode(final String typeCode) {
		log.info("Dao call for filterFetchedMetaDataBySecrecyCodes method");
		final List<String> listDescription = new ArrayList<>();
		final List<CodeReferenceEntity> listCodeReferenceEntity = codeReferenceRepository
				.findAllByTypeCdOrderByValueTx(typeCode);

		if (CollectionUtils.isNotEmpty(listCodeReferenceEntity)) {
			for (final CodeReferenceEntity codeReferenceEntity : listCodeReferenceEntity) {
				listDescription.add(codeReferenceEntity.getDescriptionTx());
			}
		}
		return listDescription;
	}

	/**
	 * This method is used to fetch code reference via type code
	 * 
	 * @param typeCode - unique typeCode
	 * @return
	 */
	public List<CodeReferenceLookup> fetchCodeReferenceViaTypeCode(final String typeCode) {
		log.info("Dao call for fetchFeeCodeForImport method");
		final List<CodeReferenceLookup> listCodeReferenceLookup = new ArrayList<>();
		final List<CodeReferenceEntity> listCodeReferenceEntity = codeReferenceRepository
				.findAllByTypeCdOrderByValueTx(typeCode);

		if (CollectionUtils.isNotEmpty(listCodeReferenceEntity)) {
			for (final CodeReferenceEntity codeReferenceEntity : listCodeReferenceEntity) {
				final CodeReferenceLookup codeReferenceLookup = new CodeReferenceLookup();
				codeReferenceLookup.setValueText(codeReferenceEntity.getValueTx());
				codeReferenceLookup.setDescriptionText(codeReferenceEntity.getDescriptionTx());
				listCodeReferenceLookup.add(codeReferenceLookup);
			}
		}
		return listCodeReferenceLookup;
	}

	/**
	 * This method is used to get codeReference Desc based on typeCode value
	 *
	 * @param typeCode - input type code
	 * @param valueTx  - input value code
	 * @return
	 */
	public String getFirstDescCodeRefByTypeCdAndValue(final String typeCode, final String valueTx) {
		final CodeReferenceEntity codeReferenceEntity = codeReferenceRepository
				.findOne(new CodeReferenceId(typeCode, valueTx));
		return null == codeReferenceEntity ? EMPTY_STR : codeReferenceEntity.getDescriptionTx();
	}

	public CodeReferenceEntity getCodeReferenceEntity() {
		return codeReferenceRepository.findOne(new CodeReferenceId(OPSGBPSERVICES_URL, OPSGBPSERVICES_URL));
	}

}
