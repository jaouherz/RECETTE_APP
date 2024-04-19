package com.recetteapp.security.project;

import com.recetteapp.security.file.file;
import com.recetteapp.security.user.User;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class addprojectrequest {
    private String name ;
    private String description ;

    private String url ;
    private String vav_metier;

    private User vav_orga ;

    private file dpt;
    private file t_u;
    private boolean intervention;
    private boolean envi;

    public String getEnvi1() {
        return String.valueOf(envi);
    }
    public String getIntervention1() {
        return String.valueOf(intervention);
    }
    public String domaine ;
}
