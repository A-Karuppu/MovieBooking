package com.adminmovies.services;

import com.adminmovies.model.Movie;
import java.util.List;

public interface MovieService {
    Movie addMovie(Movie movie);
    List<Movie> getAllMovies();
    void deleteMovie(Long id);
}
