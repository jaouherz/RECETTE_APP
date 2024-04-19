package com.recetteapp.security.Domaine;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class Domaineinfo {
    private Integer id ;
    private String name ;

    private String vav_metier;

    private String respmetier;


    private String vav_orga ;

    private String resorga;

    private String respEtude;

    private String vav_etude;
}
