package com.authen.project.controllers;

import com.authen.project.models.User;
import com.authen.project.repositories.UserRepository;
import com.authen.project.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;



@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
    private final UserService userService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    public UserController(UserService userService, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/me")
    public ResponseEntity<User> authenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) authentication.getPrincipal();

        return ResponseEntity.ok(currentUser);
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> allUsers() {
        List<User> users = userService.allUsers();

        return ResponseEntity.ok(users);
    }


        @PostMapping("/users") // or "/adduser" based on your route
        public ResponseEntity<?> addUser(@RequestBody User user) {
            try {
                // 3. Check for duplicate email manually (cleaner error message)
                if (userRepository.findByEmail(user.getEmail()).isPresent()) {
                    return ResponseEntity.badRequest().body("Email already in use.");
                }

                // 4. ENCRYPT THE PASSWORD
                user.setPassword(passwordEncoder.encode(user.getPassword()));

                userRepository.save(user);
                return ResponseEntity.ok(user);

            } catch (Exception e) {
                return ResponseEntity.badRequest().body("Error adding user.");
            }
        }
    }
