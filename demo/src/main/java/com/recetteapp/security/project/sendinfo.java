package com.recetteapp.security.project;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder

@AllArgsConstructor
public class sendinfo {
    private String email;
    private String msg;
}
