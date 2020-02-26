package gov.uspto.patent.ptab.repository;

import java.math.BigDecimal;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import gov.uspto.patent.ptab.entities.StndResourceObjectEntity;

/**
 *
 * This is the interface class for StndResourceObject
 *
 * @author 2020 Development Team
 *
 */
@Repository
public interface StndResourceObjectRepository extends BaseJpaRepository<StndResourceObjectEntity, BigDecimal> {
}
