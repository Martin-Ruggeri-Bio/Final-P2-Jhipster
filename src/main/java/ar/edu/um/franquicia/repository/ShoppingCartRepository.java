package ar.edu.um.franquicia.repository;

import ar.edu.um.franquicia.domain.ShoppingCart;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the ShoppingCart entity.
 */
@Repository
public interface ShoppingCartRepository extends JpaRepository<ShoppingCart, Long> {
    @Query("select shoppingCart from ShoppingCart shoppingCart where shoppingCart.client.login = ?#{principal.username}")
    List<ShoppingCart> findByClientIsCurrentUser();

    default Optional<ShoppingCart> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<ShoppingCart> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<ShoppingCart> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct shoppingCart from ShoppingCart shoppingCart left join fetch shoppingCart.client",
        countQuery = "select count(distinct shoppingCart) from ShoppingCart shoppingCart"
    )
    Page<ShoppingCart> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct shoppingCart from ShoppingCart shoppingCart left join fetch shoppingCart.client")
    List<ShoppingCart> findAllWithToOneRelationships();

    @Query("select shoppingCart from ShoppingCart shoppingCart left join fetch shoppingCart.client where shoppingCart.id =:id")
    Optional<ShoppingCart> findOneWithToOneRelationships(@Param("id") Long id);
}
