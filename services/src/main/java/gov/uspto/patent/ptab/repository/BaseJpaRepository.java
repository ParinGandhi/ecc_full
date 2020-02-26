package gov.uspto.patent.ptab.repository;

import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.data.jpa.repository.JpaRepository;

@NoRepositoryBean
public interface BaseJpaRepository<T, I> extends JpaRepository<T, I> {

	default T findOne(final I id) {
		return findById(id).orElse(null);
	}

}
