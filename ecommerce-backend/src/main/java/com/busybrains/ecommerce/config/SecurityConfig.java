package com.busybrains.ecommerce.config;

import com.busybrains.ecommerce.security.AuthTokenFilter;
import com.busybrains.ecommerce.security.HttpCookieOAuth2AuthorizationRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.web.DefaultOAuth2AuthorizationRequestResolver;
import org.springframework.security.oauth2.client.web.OAuth2AuthorizationRequestResolver;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Autowired
    private AuthTokenFilter authTokenFilter;

    @Autowired
    private OAuth2LoginSuccessHandler oauth2LoginSuccessHandler;

    @Autowired
    private ClientRegistrationRepository clientRegistrationRepository;

    @Autowired
    private HttpCookieOAuth2AuthorizationRequestRepository httpCookieOAuth2AuthorizationRequestRepository;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> cors.configurationSource(request -> {
                CorsConfiguration config = new CorsConfiguration();
                config.setAllowedOrigins(Arrays.asList("http://localhost:3000", "http://localhost:8080"));
                config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                config.setAllowedHeaders(Arrays.asList("*"));
                config.setAllowCredentials(true);
                return config;
            }))
            // Use IF_REQUIRED to allow cookies/sessions for OAuth2
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED))
            .authorizeHttpRequests(auth -> auth
                // 1. ALLOW React static files and routes
                .requestMatchers("/", "/index.html", "/static/**", "/*.js", "/*.json", "/*.png", "/favicon.ico").permitAll()
                .requestMatchers("/login", "/register", "/dashboard", "/profile").permitAll()
                
                // 2. ALLOW Auth APIs
                .requestMatchers("/api/auth/**", "/login/**", "/oauth2/**", "/error").permitAll()
                
                // 3. PROTECT Data APIs
                .requestMatchers("/api/products/**", "/api/users/**").authenticated()
                .anyRequest().permitAll()
            )
            .oauth2Login(oauth2 -> oauth2
                .authorizationEndpoint(authorization -> authorization
                    .authorizationRequestResolver(authorizationRequestResolver(this.clientRegistrationRepository))
                    .authorizationRequestRepository(httpCookieOAuth2AuthorizationRequestRepository) // ADDED THIS
                )
                .successHandler(oauth2LoginSuccessHandler)
            );

        http.addFilterBefore(authTokenFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    private OAuth2AuthorizationRequestResolver authorizationRequestResolver(ClientRegistrationRepository clientRegistrationRepository) {
        DefaultOAuth2AuthorizationRequestResolver authorizationRequestResolver = 
                new DefaultOAuth2AuthorizationRequestResolver(clientRegistrationRepository, "/oauth2/authorization");
        
        authorizationRequestResolver.setAuthorizationRequestCustomizer(
            customizer -> customizer.additionalParameters(params -> params.put("prompt", "select_account"))
        );
        
        return authorizationRequestResolver;
    }
}