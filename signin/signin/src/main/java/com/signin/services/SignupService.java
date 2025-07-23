package com.signin.services;

import com.signin.model.SignupModel;
import com.signin.repository.SignupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SignupService {

    @Autowired
    private SignupRepository repository;

    public String registerUser(SignupModel user, String confirmPassword) {
        if (!user.getPassword().equals(confirmPassword)) {
            return "Password and Confirm Password do not match";
        }

        if (repository.existsById(user.getEmail())) {
            return "Email already registered!";
        }

        repository.save(user);
        return "Registration successful!";
    }

    public String loginUser(String email, String password) {
        if (!repository.existsById(email)) {
            return "User not found";
        }

        SignupModel user = repository.findById(email).get();
        if (!user.getPassword().equals(password)) {
            return "Incorrect password";
        }

        return "Login successful";
    }
}
