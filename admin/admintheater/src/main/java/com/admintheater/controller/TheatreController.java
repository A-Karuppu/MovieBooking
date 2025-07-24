package com.admintheater.controller;

import com.admintheater.model.Theatre;
import com.admintheater.services.TheatreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/theatres")
@CrossOrigin(origins = "*")
public class TheatreController {

    @Autowired
    private TheatreService service;

    @PostMapping("/add")
    public Theatre addTheatre(@RequestBody Theatre theatre) {
        return service.addTheatre(theatre);
    }

    @GetMapping("/list")
    public List<Theatre> getAllTheatres() {
        return service.getAllTheatres();
    }

    @DeleteMapping("/delete/{id}")
    public String deleteTheatre(@PathVariable Long id) {
        service.deleteTheatre(id);
        return "Theatre deleted successfully";
    }
}
