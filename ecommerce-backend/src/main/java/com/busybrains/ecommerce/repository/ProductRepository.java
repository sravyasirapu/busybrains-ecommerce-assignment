package com.busybrains.ecommerce.repository;

import com.busybrains.ecommerce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
    // JpaRepository already has all the methods like save(), findById(), delete() etc.
}