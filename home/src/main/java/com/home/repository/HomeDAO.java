package com.home.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class HomeDAO {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public String fetchWelcomeMessage() {
        String sql = "SELECT message FROM welcome_table WHERE id = 1";
        return jdbcTemplate.queryForObject(sql, String.class);
    }
}

