package be.honeyq.HoneyQBE.repository;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import be.honeyq.HoneyQBE.model.OrderDetail;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, UUID> {}