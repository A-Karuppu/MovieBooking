package com.adminmovies.services;

import com.adminmovies.model.Movie;
import com.adminmovies.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieServiceImpl implements MovieService {

    @Autowired
    private MovieRepository repository;

    @Override
    public Movie addMovie(Movie movie) {
        return repository.save(movie);
    }

    @Override
    public List<Movie> getAllMovies() {
        return repository.findAll();
    }

    @Override
    public void deleteMovie(Long id) {
        repository.deleteById(id);
    }
}
