package com.recetteapp.security.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public class forgetpassrequest {
        private String email;


}
