package com.recetteapp.security.history;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
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
public class History {
    @Id
    @GeneratedValue
    private Integer id;
    private LocalDateTime dateopeartion;
    private String nomoperation ;
    private Integer idprojet;
    private String nomprojet;






}
