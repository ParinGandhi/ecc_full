package gov.uspto.patent.ptab.repository;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import gov.uspto.patent.ptab.domain.ApplicationUserQuery;
import gov.uspto.patent.ptab.entities.ApplicationUserEntity;

@Repository
public class ApplicationUserRepositoryCriteria {

    @Autowired
    private SessionFactory sessionFactory;

    public List<ApplicationUserEntity> getUserInfo(ApplicationUserQuery applicationUserQuery) {
        final CriteriaBuilder builder = sessionFactory.createEntityManager().getCriteriaBuilder();
        final CriteriaQuery<ApplicationUserEntity> query = builder.createQuery(ApplicationUserEntity.class);
        final Root<ApplicationUserEntity> applicationUserEntity = query.from(ApplicationUserEntity.class);
        final List<Predicate> predicates = new ArrayList<>();

        if (null != applicationUserQuery.getLoginId()) {
            predicates.add(builder.equal(applicationUserEntity.get("userId"), applicationUserQuery.getLoginId()));
        }
        if (null != applicationUserQuery.getUserIdentiifier()) {

            predicates.add(builder.equal(applicationUserEntity.get("applicationUserId"),
                    new BigDecimal(applicationUserQuery.getUserIdentiifier())));
        }
        if (null != applicationUserQuery.getUserWorkerNumber()) {

            predicates.add(
                    builder.equal(applicationUserEntity.get("cfkEmployeeId"), applicationUserQuery.getUserWorkerNumber()));

        }

        if (null != applicationUserQuery.getFirstName()) {

            predicates.add(builder.like(builder.lower(applicationUserEntity.<String> get("firstNm")),
                    "%" + applicationUserQuery.getFirstName().toLowerCase() + "%"));
        }
        if (null != applicationUserQuery.getLastName()) {

            predicates.add(builder.like(builder.lower(applicationUserEntity.<String> get("lastNm")),
                    "%" + applicationUserQuery.getLastName().toLowerCase() + "%"));
        }
        final TypedQuery<ApplicationUserEntity> typedQuery = sessionFactory.createEntityManager()
                .createQuery(query.select(applicationUserEntity).where(predicates.toArray(new Predicate[] {})));

        return typedQuery.getResultList();
    }

}
