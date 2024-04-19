package com.recetteapp.security.project;

import com.recetteapp.security.Domaine.Domaine;
import com.recetteapp.security.file.file;
import com.recetteapp.security.user.User;
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
public class project {
    @Id
    @GeneratedValue
    private Integer id;
    private String name ;
    private String description ;

    private String url ;

    private LocalDateTime datedajout ;

    @ManyToOne
    @JoinColumn(name = "dpt_file_id") // foreign key column name
    private file dpt_id;
    @ManyToOne
    @JoinColumn(name = "tu_file_id")
    private file T_U;
    private boolean intervention = false;
    private boolean envi  = false;
    private String etat ;
    @ManyToOne
    @JoinColumn
    private Domaine domaineid;
}
