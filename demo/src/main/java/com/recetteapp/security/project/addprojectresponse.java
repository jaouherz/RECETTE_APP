package com.recetteapp.security.project;

import com.recetteapp.security.Domaine.Domaine;
import com.recetteapp.security.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.File;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class addprojectresponse {
    private Integer id ;
    private String name ;
    private String description ;

    private String url ;
    private String vav_metier;

    private User vav_orga ;
private LocalDateTime datedajout  ;
private String dptname;
    private String tuname;
    private boolean intervention = false;
    private boolean envi  = false;
    private String Etat ;
    private Domaine domaine;
}
