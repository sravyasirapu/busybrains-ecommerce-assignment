package com.busybrains.ecommerce.controller;

import com.busybrains.ecommerce.entity.Product;
import com.busybrains.ecommerce.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {

    @Autowired
    private ProductService productService;

    // Anyone (USER or ADMIN) can view products
    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    // Only ADMIN can add a product
    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN')") // Changed from hasRole('ADMIN')
    public Product createProduct(@RequestBody Product product) {
        return productService.saveProduct(product);
    }

    // Only ADMIN can update a product
    
    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')") // Changed from hasRole('ADMIN')
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product productDetails) {
        return productService.getProductById(id)
                .map(product -> {
                    product.setName(productDetails.getName());
                    product.setDescription(productDetails.getDescription());
                    product.setPrice(productDetails.getPrice());
                    product.setImageUrl(productDetails.getImageUrl());
                    return ResponseEntity.ok(productService.saveProduct(product));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Only ADMIN can delete a product
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')") // Changed from hasRole('ADMIN')
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok().build();
    }
}