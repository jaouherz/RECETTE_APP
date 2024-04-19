package com.recetteapp.security.project;

import com.recetteapp.security.file.file;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;

@Data
@Builder

@AllArgsConstructor
public class emailinfo {

    private file attachment1;


    public emailinfo() {

    }
}
