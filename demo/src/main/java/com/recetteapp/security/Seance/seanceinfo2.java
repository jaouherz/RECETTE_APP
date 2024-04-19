package com.recetteapp.security.Seance;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class seanceinfo2 {

        private Integer id;

        private String startTime;

        private String endTime;
        private   String poste;
        private String etats ;

        private String projectname;
        private String statut ;
        private String cause ;
    }
