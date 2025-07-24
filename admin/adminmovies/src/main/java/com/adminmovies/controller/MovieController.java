package com.adminmovies.controller;

import com.adminmovies.model.Movie;
import com.adminmovies.services.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/movies")
@CrossOrigin(origins = "*")
public class MovieController {

    @Autowired
    private MovieService service;

    @PostMapping("/add")
    public Movie addMovie(@RequestBody Movie movie) {
        return service.addMovie(movie);
    }

    @GetMapping("/list")
    public List<Movie> listMovies() {
        return service.getAllMovies();
    }

    @DeleteMapping("/delete/{id}")
    public void deleteMovie(@PathVariable Long id) {
        service.deleteMovie(id);
    }
}
