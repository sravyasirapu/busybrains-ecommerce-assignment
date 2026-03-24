package com.busybrains.ecommerce.controller;

import com.busybrains.ecommerce.entity.User;
import com.busybrains.ecommerce.repository.UserRepository;
import com.busybrains.ecommerce.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthService authService;

    // GET /api/users/profile - View own profile
    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(Authentication authentication) {
        String username = authentication.getName();
        return ResponseEntity.ok(userRepository.findByUsername(username).get());
    }
    
    @GetMapping("/my-role")
    public ResponseEntity<?> getMyAuthorities(Authentication authentication) {
        // This will return the exact roles the server sees for your token
        return ResponseEntity.ok(authentication.getAuthorities());
    }

    // PUT /api/users/profile - Update personal info
    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(Authentication authentication, @RequestBody User userData) {
        String username = authentication.getName();
        return ResponseEntity.ok(authService.updateProfile(username, userData));
    }

    // PUT /api/users/change-password
    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword(Authentication authentication, @RequestBody Map<String, String> request) {
        String username = authentication.getName();
        String newPassword = request.get("newPassword");
        authService.updatePassword(username, newPassword);
        return ResponseEntity.ok("Password updated successfully!");
    }
}