package com.signin.controller;

import com.signin.model.SignupModel;
import com.signin.services.SignupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
public class SignupController {

    @Autowired
    private SignupService service;

    // DTO for registration with confirmPassword
    static class RegisterRequest {
        public String name;
        public String mobile;
        public String email;
        public String password;
        public String confirmPassword;
    }

    @PostMapping("/signup")
    public String signup(@RequestBody RegisterRequest req) {
        SignupModel user = new SignupModel();
        user.setName(req.name);
        user.setMobile(req.mobile);
        user.setEmail(req.email);
        user.setPassword(req.password);
        return service.registerUser(user, req.confirmPassword);
    }

    // DTO for login
    static class LoginRequest {
        public String email;
        public String password;
    }

    @PostMapping("/signin")
    public String signin(@RequestBody LoginRequest req) {
        return service.loginUser(req.email, req.password);
    }
}
