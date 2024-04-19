package com.recetteapp.security.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class changepasswordrequest {
    private String email;
    private String currentPassword;
    private String newPassword;
}
