package gov.uspto.patent.ptab.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import gov.uspto.patent.ptab.entities.UserFavoriteLink;

/**
 *
 * This is the interface class for UserFavoriteLink
 *
 * @author 2020 Development Team
 *
 */
@Repository
public interface UserFavoriteLinkRepository extends BaseJpaRepository<UserFavoriteLink, Long> {

    /**
     * This method is used to fetch entities vua application user identifier
     * 
     * @param fkApplicationUserId - unique input application user identifier
     * @return
     */
   List<UserFavoriteLink> findByApplicationUserIdentifierOrderByFavoritePriorityNumber(long fkApplicationUserId);
   
}
