package com.busybrains.ecommerce.controller;

import com.busybrains.ecommerce.dto.LoginRequest;
import com.busybrains.ecommerce.dto.LoginResponse;
import com.busybrains.ecommerce.entity.User;
import com.busybrains.ecommerce.repository.UserRepository;
import com.busybrains.ecommerce.security.JwtUtils;
import com.busybrains.ecommerce.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Error: Username is already taken!");
        }
        return ResponseEntity.ok(authService.registerUser(user));
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        // 1. Verify username and password
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        // 2. Generate JWT Token
        String jwt = jwtUtils.generateToken(loginRequest.getUsername());
        
        // 3. Get User Details to send back role
        User user = userRepository.findByUsername(loginRequest.getUsername()).get();

        return ResponseEntity.ok(new LoginResponse(jwt, user.getUsername(), user.getRole()));
    }
}