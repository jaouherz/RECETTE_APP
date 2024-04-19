package com.recetteapp.security.auth;

import com.recetteapp.security.config.LogoutService;
import com.recetteapp.security.user.Role;
import com.recetteapp.security.user.User;
import com.recetteapp.security.user.UserRepository;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

  private final AuthenticationService service;
  private final UserRepository repo;

  @PostMapping("/register")
  public ResponseEntity<registerresponse> register(
          @RequestBody RegisterRequest request
  ) throws MessagingException {
    return ResponseEntity.ok(service.register(request));
  }

  @PostMapping("/authenticate")
  public ResponseEntity<AuthenticationResponse> authenticate(
          @RequestBody AuthenticationRequest request
  ) {

    return ResponseEntity.ok(service.authenticate(request));
  }
  @GetMapping("/find/{id}")
  public ResponseEntity<User> getUserById(@PathVariable("id") Integer id){
    User user= service.finduserById(id);
    return new ResponseEntity<>(user, HttpStatus.OK);
  }
  @PostMapping("/changepass")
  public ResponseEntity<changepasswordresponse> changePassword(
          @RequestBody changepasswordrequest request) throws Exception {
    return ResponseEntity.ok(service.changePassword(request));
  }

  @PostMapping("/forgetpass")
  public ResponseEntity<forgetpassresponse> forgetPassword(
          @RequestBody forgetpassrequest request
  ) throws Exception {

    return ResponseEntity.ok(service.forgetPassword(request));
  }

  @GetMapping("/users")


  public ResponseEntity<List<User>> getAllusers() {
    List<User> userr = service.findAllUsers();
    return new ResponseEntity<>(userr, HttpStatus.OK);
  }
  @PostMapping("/forgetpass2")
  public ResponseEntity<forgetpass2response> forgetpass2(
          @RequestBody fogetpass2request request) throws Exception {
    return ResponseEntity.ok(service.forgetpass2(request));
  }
  @DeleteMapping("/delete/{id}")
  public ResponseEntity<?> deleteUser(@PathVariable("id") Integer id) {
    service.deleteUserAndTokensById(id);
    return new ResponseEntity<>(HttpStatus.OK);
  }
  @PutMapping("/update/{id}")
  public void updateUser(@PathVariable Integer id, @RequestBody User user) {
    service.updateUser(id, user);
  }
  @GetMapping("/findbymail/{email}")
  public ResponseEntity<User> getUserBymail(@PathVariable("email") String email){
    User user = service.finduserByemail(email);

      return new ResponseEntity<>(user, HttpStatus.OK);

  }
  @GetMapping("/users/role/{roleName}")

    public ResponseEntity<List<User>> getUsersByRole(@PathVariable Role roleName) {
      List<User> userr = service.getUsersByRole(roleName);
      return new ResponseEntity<>(userr, HttpStatus.OK);
    }
  }
