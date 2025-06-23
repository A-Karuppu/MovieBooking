package com.home.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.home.services.HomeServices;

@RestController
@RequestMapping("/home")
@CrossOrigin(origins = "*")
public class HomeController {

    @Autowired
    private HomeServices homeServices;

    @GetMapping("/message")
    public String getMessage() {
        return homeServices.getWelcomeMessage();
    }
}
