package ar.edu.um.franquicia.repository;

import ar.edu.um.franquicia.domain.Sale;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Sale entity.
 */
@Repository
public interface SaleRepository extends JpaRepository<Sale, Long> {
    @Query("select sale from Sale sale where sale.client.login = ?#{principal.username}")
    List<Sale> findByClientIsCurrentUser();

    default Optional<Sale> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Sale> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Sale> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct sale from Sale sale left join fetch sale.client",
        countQuery = "select count(distinct sale) from Sale sale"
    )
    Page<Sale> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct sale from Sale sale left join fetch sale.client")
    List<Sale> findAllWithToOneRelationships();

    @Query("select sale from Sale sale left join fetch sale.client where sale.id =:id")
    Optional<Sale> findOneWithToOneRelationships(@Param("id") Long id);
}
