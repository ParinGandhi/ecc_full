package gov.uspto.patent.ptab.repository;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import gov.uspto.patent.ptab.entities.UserDefinedDateEntity;

/**
 *
 * This is the interface class for UserDefinedDate
 *
 * @author 2020 Development Team
 *
 */
@Repository
public interface UserDefinedDateRepository extends BaseJpaRepository<UserDefinedDateEntity, BigDecimal> {
    
    @Query(value = "SELECT userDefinedDate FROM UserDefinedDateEntity userDefinedDate WHERE"
            + " userDefinedDate.applicationUserId = ?1 ")
    public List<UserDefinedDateEntity> findAllByApplicationUserId(final BigDecimal applicationUserId);

}
