package com.movie.show.service;

import com.movie.show.model.Show;
import com.movie.show.repository.ShowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShowService {

    @Autowired
    private ShowRepository repository;

    public Show addShow(Show show) {
        return repository.save(show);
    }

    public List<Show> getAllShows() {
        return repository.findAll();
    }

    public String deleteShow(Long id) {
        repository.deleteById(id);
        return "Show deleted with id: " + id;
    }
}
