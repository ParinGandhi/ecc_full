package gov.uspto.patent.ptab.repository;

import java.math.BigDecimal;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import gov.uspto.patent.ptab.entities.UserCustomDataEntity;

/**
*
* This is the interface class for UserCustomData
*
* @author 2020 Development Team
*
*/
@Repository
public interface UserCustomDataRepository extends BaseJpaRepository<UserCustomDataEntity, BigDecimal> {
    
    public UserCustomDataEntity findOneByApplicationUserId(BigDecimal applicationUserId); 

}
