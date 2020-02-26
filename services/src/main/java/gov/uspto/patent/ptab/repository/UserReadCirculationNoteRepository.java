package gov.uspto.patent.ptab.repository;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import gov.uspto.patent.ptab.entities.UserReadCirculationNoteEntity;

/**
 *
 * This is the interface class for UserReadCirculationNote
 *
 * @author 2020 Development Team
 *
 */
@Repository
public interface UserReadCirculationNoteRepository extends BaseJpaRepository<UserReadCirculationNoteEntity, BigDecimal> {

    UserReadCirculationNoteEntity findByFkCirculationNoteIdAndFkApplicationUserId(BigDecimal fkCirculationNoteId,
            BigDecimal fkApplicationUserId);

    List<UserReadCirculationNoteEntity> findAllByFkCirculationNoteId(BigDecimal fkCirculationNoteId);
}
