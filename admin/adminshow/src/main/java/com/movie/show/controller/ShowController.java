package com.movie.show.controller;

import com.movie.show.model.Show;
import com.movie.show.service.ShowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/shows")
@CrossOrigin(origins = "*")
public class ShowController {

    @Autowired
    private ShowService service;

    @PostMapping("/add")
    public Show addShow(@RequestBody Show show) {
        return service.addShow(show);
    }

    @GetMapping("/list")
    public List<Show> getAllShows() {
        return service.getAllShows();
    }

    @DeleteMapping("/delete/{id}")
    public String deleteShow(@PathVariable Long id) {
        return service.deleteShow(id);
    }
}
