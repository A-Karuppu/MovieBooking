package com.admintheater.services;

import com.admintheater.model.Theatre;
import com.admintheater.repository.TheatreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TheatreService {

    @Autowired
    private TheatreRepository repository;

    public Theatre addTheatre(Theatre theatre) {
        return repository.save(theatre);
    }

    public List<Theatre> getAllTheatres() {
        return repository.findAll();
    }

    public void deleteTheatre(Long id) {
        repository.deleteById(id);
    }
}
