package com.recetteapp.security.Domaine;

import com.recetteapp.security.user.User;
import com.recetteapp.security.user.User2;
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
public class Domaine {
    @Id
    @GeneratedValue
    private Integer id;
    private String name ;
    @ManyToOne
    @JoinColumn
    private User2 vav_metier;
    @ManyToOne
    @JoinColumn
    private User2 respmetier;

    @ManyToOne
    @JoinColumn
    private User vavorga ;
    @ManyToOne
    @JoinColumn
    private User2 resorga;
    @ManyToOne
    @JoinColumn
    private User2 RespEtude;
    @ManyToOne
    @JoinColumn
    private User2 vav_etude;


}
