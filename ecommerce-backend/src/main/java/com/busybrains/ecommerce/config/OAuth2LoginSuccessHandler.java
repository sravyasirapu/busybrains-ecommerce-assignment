package com.busybrains.ecommerce.config;

import com.busybrains.ecommerce.entity.User;
import com.busybrains.ecommerce.repository.UserRepository;
import com.busybrains.ecommerce.security.JwtUtils;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;

@Component
public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtils jwtUtils;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, 
                                        Authentication authentication) throws IOException, ServletException {
        
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email = oAuth2User.getAttribute("email");

        // 1. Find or Create User in DB
        User user = userRepository.findByUsername(email).orElseGet(() -> {
            User newUser = new User();
            newUser.setUsername(email);
            newUser.setEmail(email);
            newUser.setPassword(""); // No password for Google users
            newUser.setRole("ROLE_USER");
            return userRepository.save(newUser);
        });

        // 2. Generate JWT Token
        String token = jwtUtils.generateToken(user.getUsername());

        // 3. Redirect back to React with the token in the URL
        String targetUrl = UriComponentsBuilder.fromUriString("http://localhost:8080/login")
                .queryParam("token", token)
                .queryParam("username", user.getUsername())
                .queryParam("role", user.getRole())
                .build().toUriString();

        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }
}