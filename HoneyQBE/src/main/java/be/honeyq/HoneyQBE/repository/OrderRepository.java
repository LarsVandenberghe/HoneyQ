package be.honeyq.HoneyQBE.repository;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import be.honeyq.HoneyQBE.model.Order;
import be.honeyq.HoneyQBE.model.User;
import java.util.List;


public interface OrderRepository extends JpaRepository<Order, UUID> {
    List<Order> findByUser(User user);

    @Query("SELECT o FROM Order o WHERE o.status IN ('SENT', 'PAID', 'RECEIVED')")
    List<Order> pendingOrders();
}