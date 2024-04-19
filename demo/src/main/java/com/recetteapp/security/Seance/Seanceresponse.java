package com.recetteapp.security.Seance;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.recetteapp.security.project.project;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Seanceresponse {
    private Integer id;

    private LocalDateTime startTime;

    private LocalDateTime endTime;
    private   String poste;
    private String etats ;

    private String projectname;
    private String statut ;
}
