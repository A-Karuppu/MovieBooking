package com.movie.movie.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

public class MovieDAO {
    @Autowired
    private JdbcTemplate jdbcTemplate;


}
