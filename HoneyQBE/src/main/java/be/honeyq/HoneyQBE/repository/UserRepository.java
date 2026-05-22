package be.honeyq.HoneyQBE.repository;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import be.honeyq.HoneyQBE.model.User;

public interface UserRepository extends JpaRepository<User, UUID> {
    User findByEmailAddress(String emailAddress);
}