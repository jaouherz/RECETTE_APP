package com.recetteapp.security.auth;

import com.recetteapp.security.user.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;




    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor

    public class registerresponse {
        private String token;
        private String firstname;
        private String lastname;
        private String email;
        private String password;
        private Role role ;
        private String msg ;
    }


