package com.busybrains.ecommerce.config;

import com.busybrains.ecommerce.entity.Product;
import com.busybrains.ecommerce.entity.User;
import com.busybrains.ecommerce.repository.ProductRepository;
import com.busybrains.ecommerce.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        
        // 1. Automatically create Admin and User if they don't exist
        if (userRepository.findByUsername("admin").isEmpty()) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("password123"));
            admin.setEmail("admin@busybrains.com");
            admin.setRole("ROLE_ADMIN");
            userRepository.save(admin);
        }

        // 2. Automatically load Products if the store is empty
        if (productRepository.count() == 0) {
            saveProduct("iPhone 15 Pro", "Titanium build, A17 Pro chip, Pro camera system.", 125000.0, "https://images.pexels.com/photos/18525574/pexels-photo-18525574.jpeg?auto=compress&cs=tinysrgb&w=500");
            saveProduct("MacBook Air M3", "Liquid Retina display, 1080p FaceTime HD camera.", 114000.0, "https://images.pexels.com/photos/129208/pexels-photo-129208.jpeg?auto=compress&cs=tinysrgb&w=500");
            saveProduct("Sony XM5", "Industry-leading noise cancellation, Auto NC Optimizer.", 29000.0, "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop");
            saveProduct("Apple Watch", "Always-On Retina display, Blood Oxygen app.", 45000.0, "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=500");
            saveProduct("Canon Camera", "Full-frame sensor, 4K video, Dual Pixel CMOS AF.", 185000.0, "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&h=500&fit=crop");
            saveProduct("Gaming Tablet", "120Hz display, Snapdragon Processor, 10000mAh.", 55000.0, "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&h=500&fit=crop");
            
            System.out.println(">>> Database initialized with sample products!");
        }
    }

    private void saveProduct(String name, String desc, Double price, String url) {
        Product p = new Product();
        p.setName(name);
        p.setDescription(desc);
        p.setPrice(price);
        p.setImageUrl(url);
        productRepository.save(p);
    }
}