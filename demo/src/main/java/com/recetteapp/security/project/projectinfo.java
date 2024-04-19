package com.recetteapp.security.project;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
@Builder

@AllArgsConstructor

public class projectinfo {

        private Integer id;
        private String name;
        private String description;
        private String url;
private String domaine ;
        private String dpt_file_name;
        private String tu_file_name;
    private LocalDateTime datedajout ;
    private LocalDate date;
    private LocalTime time;
    private String etat;

    public projectinfo() {

    }

    // getters and setters omitted for brevity
    }

