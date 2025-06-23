package com.home.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.home.repository.HomeDAO;

@Service
public class HomeServices {

    @Autowired
    private HomeDAO homeDAO;

    public String getWelcomeMessage() {
        return homeDAO.fetchWelcomeMessage();
    }
}
