package com.recetteapp.security.file;

import org.springframework.web.multipart.MultipartFile;

public interface fileservice1 {
    file saveAttachment(MultipartFile file) throws Exception;

    file getAttachment(String fileId) throws Exception;

}
