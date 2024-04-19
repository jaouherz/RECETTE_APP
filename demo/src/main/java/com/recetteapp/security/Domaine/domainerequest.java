package com.recetteapp.security.Domaine;

import com.recetteapp.security.user.User;
import com.recetteapp.security.user.User2;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class domainerequest {
    private String name ;

    private String vav_metier;

    private String respmetier;


    private String vav_orga ;

    private String resorga;

    private String respEtude;

    private String vav_etude;
}
