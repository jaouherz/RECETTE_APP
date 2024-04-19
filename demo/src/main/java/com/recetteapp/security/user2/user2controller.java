package com.recetteapp.security.user2;

import com.recetteapp.security.auth.AuthenticationService;
import com.recetteapp.security.auth.RegisterRequest;
import com.recetteapp.security.auth.registerresponse;
import com.recetteapp.security.email.EmailSender;
import com.recetteapp.security.user.User;
import com.recetteapp.security.user.User2;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/v3/user2")
@RequiredArgsConstructor
public class user2controller {
    private final user2service service;
    private final user2repo repo;
    private  final EmailSender emailSender;
    @PostMapping("/adduser2")
    public ResponseEntity<User2> register(
            @RequestBody User2 request
    ) {
        return ResponseEntity.ok(service.register(request));
    }
    @PutMapping("/updateuser2/{id}")
    public ResponseEntity<User2>updateUser(@PathVariable Integer id, @RequestBody User2 user) {
        return ResponseEntity.ok(service.update(id, user));
    }


    @GetMapping("/findbyrole/{profile}")
    public ResponseEntity<  List<User2>> getUserByrole(@PathVariable("profile") String profile){
        List<User2> user = service.findByprofile(profile);

        return new ResponseEntity<>(user, HttpStatus.OK);

    } @GetMapping("/findid/{id}")
    public ResponseEntity<User2> getUserByid(@PathVariable("id") Integer id){
        User2 user = service.findById(id);

        return new ResponseEntity<>(user, HttpStatus.OK);

    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteProject(@PathVariable Integer id) throws Exception {

        return ResponseEntity.ok(service.deleteuser2(id));
    }
    @GetMapping("/users")


    public ResponseEntity<List<User2>> getAllusers() {
        List<User2> userr = service.findAllUsers();
        return new ResponseEntity<>(userr, HttpStatus.OK);
    }
    @GetMapping("/findbymail/{email}")
    public ResponseEntity<User2> getUserByemail(@PathVariable("email") String email){
        User2 user = service.findBymail(email);

        return new ResponseEntity<>(user, HttpStatus.OK);

    }

}
