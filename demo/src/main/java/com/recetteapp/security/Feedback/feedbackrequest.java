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

public class feedbackrequest {

    private Integer id;

    private Integer seanceid;
    private String statut ;
    private String description;
    private boolean finale ;
}

