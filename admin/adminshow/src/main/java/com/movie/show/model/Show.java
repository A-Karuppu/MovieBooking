package com.movie.show.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "shows")
public class Show {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String movieName;
    private String theatreName;
    private String showTime;
}
