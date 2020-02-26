package gov.uspto.patent.ptab.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import gov.uspto.patent.ptab.entities.CodeReferenceEntity;
import gov.uspto.patent.ptab.entities.CodeReferenceId;

/**
 *
 * This is the interface class for CodeReference
 *
 * @author 2020 Development Team
 *
 */
@Repository
public interface CodeReferenceRepository extends BaseJpaRepository<CodeReferenceEntity, CodeReferenceId> {
    /**
     * Fetch All CodeReferenceEntity from DB using type code
     * 
     * @param typeCd - unique type code
     * @return
     */
    public List<CodeReferenceEntity> findAllByTypeCdOrderByValueTx(String typeCd);

    /**
     * Fetch All CodeReferenceEntity from DB using type code
     * 
     * @param typeCd - unique type code
     * @return
     */
    public List<CodeReferenceEntity> findAllByValueTxOrderByValueTx(String valueTx);

    /**
     * Fetch All CodeReferenceEntity from DB using typeCode and descriptionText
     * 
     * @param typeCd - unique type code
     * @return
     */
    public CodeReferenceEntity findAllByTypeCdAndDescriptionTx(String typeCd, String descriptionTx);

    /**
     * Fetch All CodeReferenceEntity from DB using typeCode and descriptionText
     * 
     * @param typeCd - unique type code
     * @return
     */
    public List<CodeReferenceEntity> findByTypeCdIn(List<String> typeCd);

    /**
     * Fetch CodeReferenceEntity from DB using typeCode and descriptionText
     * 
     * @param typeCd - unique type code
     * @return
     */
    public CodeReferenceEntity findByTypeCd(String typeCd);

    /**
     * Fetch All CodeReferenceEntity from DB using typeCode and descriptionText
     * 
     * @param typeCd - unique type code
     * @return
     */
    public CodeReferenceEntity findAllByTypeCdAndValueTx(String typeCd, String valueTx);

    /**
     * Fetch CodeReferenceEntity from DB using descriptionText
     * 
     * @param descriptionTx - unique descriptionTx
     * @return
     */
    public CodeReferenceEntity findByTypeCdAndDescriptionTx(String typeCd, String descriptionTx);

    /**
     * Fetch CodeReferenceEntity from DB using descriptionText
     * 
     * @param valueTx
     * @param descriptionTx
     * @return
     */
    public CodeReferenceEntity findByValueTxAndDescriptionTx(String valueTx, String descriptionTx);

}
