package com.busybrains.ecommerce.repository;

import com.busybrains.ecommerce.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    // This helps us find a user by their username during login
    Optional<User> findByUsername(String username);
}