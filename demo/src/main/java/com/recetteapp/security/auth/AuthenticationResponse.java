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
public class AuthenticationResponse {


private Role role ;
private String token ;
private String email ;
}
