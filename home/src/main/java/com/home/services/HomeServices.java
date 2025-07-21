package com.home.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.home.repository.HomeRepo;

@Service
public class HomeServices {

    @Autowired
    public HomeRepo homeRepo;

    public String getWelcomeMessage() {
        return homeRepo.fetchWelcomeMessage();
    }
}
