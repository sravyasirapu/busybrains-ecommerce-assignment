package com.busybrains.ecommerce.service;

import com.busybrains.ecommerce.entity.Product;
import com.busybrains.ecommerce.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    // View all products (Available for both Admin and User)
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // Get product by ID
    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    // Create or Update product (Admin only logic)
    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    // Delete product (Admin only logic)
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
}