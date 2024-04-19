package com.recetteapp.security.Seance;

import com.recetteapp.security.project.project;
import com.recetteapp.security.user.User2;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Seance {
    @Id
    @GeneratedValue
    private Integer id;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private   String poste;
    private String etats ;
    @ManyToOne
    @JoinColumn
    private project projectid;
    private boolean emailSent ;
    private LocalDateTime datedajout ;
    private String statut;
    private boolean emailrapSent ;
}
