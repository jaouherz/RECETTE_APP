package com.recetteapp.security.demo;

import com.recetteapp.security.auth.AuthenticationService;
import com.recetteapp.security.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/democontroller")
public class democontrl {
    private final AuthenticationService service;
    @GetMapping
    public ResponseEntity<String> sayHello(){
        return  ResponseEntity.ok("hollo from secured endpoint");


    }

}
