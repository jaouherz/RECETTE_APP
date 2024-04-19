package com.recetteapp.security.Feedback;


import com.recetteapp.security.Seance.Seance;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Feedback {
    @Id
    @GeneratedValue
    private Integer id;
    @ManyToOne
    @JoinColumn
    private Seance seanceid;
    private String statut ;
    private String description;
    private boolean finale ;
}
