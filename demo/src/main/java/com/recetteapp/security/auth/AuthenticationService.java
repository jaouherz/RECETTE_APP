package com.recetteapp.security.auth;

import com.recetteapp.security.config.JwtService;
import com.recetteapp.security.email.EmailSender;
import com.recetteapp.security.exeption.UserNotFoundException;
import com.recetteapp.security.token.Token;
import com.recetteapp.security.token.TokenRepository;
import com.recetteapp.security.token.TokenType;
import com.recetteapp.security.user.Role;
import com.recetteapp.security.user.User;
import com.recetteapp.security.user.UserRepository;
import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
  private final UserRepository repository;
  private final TokenRepository tokenRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;
  private final AuthenticationManager authenticationManager;


  public registerresponse register(RegisterRequest request) throws MessagingException {
    var existingUser = repository.findByEmail(request.getEmail());


    var user = User.builder()
            .firstname(request.getFirstname())
            .lastname(request.getLastname())
            .email(request.getEmail())
            .password(passwordEncoder.encode(request.getEmail()))
            .role(request.getRole())
            .build();
    var savedUser = repository.save(user);
    var jwtToken = jwtService.generateToken(user);
    EmailSender emailSender = new EmailSender();
    String subject = "Bienvenu dans RECETTE-APP";
    String body = "Bonjour "+savedUser.getFirstname()+" !, <br>  Nous tenons à vous informer qu'un compte a été créé dans l'application Recette App avec votre adresse e-mail. Veuillez noter que votre mot de passe actuel correspond à votre adresse e-mail, mais vous pouvez le modifier à tout moment dans votre profil.";
    emailSender.sendEmail(user.getEmail(), subject, body);
    saveUserToken(savedUser, jwtToken);
    return registerresponse.builder()
            .token(jwtToken)
            .firstname(user.getFirstname())
            .email(user.getEmail())
            .lastname(user.getLastname())
            .password(user.getPassword())
            .role(user.getRole())
            .build();
  }

  public changepasswordresponse changePassword(changepasswordrequest request) throws Exception {
    User user = repository.findByEmail(request.getEmail())
            .orElseThrow(() -> new Exception("User not found"));

    if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
      throw new Exception("Invalid current password");
    }

    if (!isValidPassword(request.getNewPassword())) {
      throw new Exception("Invalid new password");
    }

    user.setPassword(passwordEncoder.encode(request.getNewPassword()));
    repository.save(user);
    EmailSender emailSender = new EmailSender();
    String subject = "RECETTE-APP";
    String body = "Bonjour "+user.getFirstname()+",<br> l'entite recette vous informe que  votre mdp a été changer ";
    emailSender.sendEmail(user.getEmail(), subject, body);
    var msga = "your password is succefully changed ";
    return changepasswordresponse.builder().msg(msga).email(user.getEmail()).currentPassword(request.getCurrentPassword()).newPassword(request.getNewPassword()).build();
  }
  public forgetpass2response forgetpass2(fogetpass2request request) throws Exception {
    User user = repository.findByEmail(request.getEmail())
            .orElseThrow(() -> new Exception("User not found"));



    if (!isValidPassword(request.getNewpassword())) {
      throw new Exception("Invalid new password");
    }

    user.setPassword(passwordEncoder.encode(request.getNewpassword()));
    repository.save(user);
    EmailSender emailSender = new EmailSender();
    String subject = "RECETTE-APP";
    String body = "Bonjour "+user.getFirstname()+",<br> l'entite recette vous informe que  votre mdp a été changer ";
    emailSender.sendEmail(user.getEmail(), subject, body);
    var msga = "salem";
    return forgetpass2response.builder().msg(msga).email(user.getEmail()).newPassword(request.getNewpassword()).build();
  }
  private boolean isValidPassword(String newPassword) {
    return true;
  }

  public AuthenticationResponse authenticate(AuthenticationRequest request) {
    authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                    request.getEmail(),
                    request.getPassword()
            )
    );
    var user = repository.findByEmail(request.getEmail())
            .orElseThrow();
    var jwtToken = jwtService.generateToken(user);
    revokeAllUserTokens(user);
    saveUserToken(user, jwtToken);
    return AuthenticationResponse.builder()
            .role(user.getRole())
            .token(jwtToken).email(user.getEmail())
            .build();
  }

  private void saveUserToken(User user, String jwtToken) {
    var token = Token.builder()
            .user(user)
            .token(jwtToken)
            .tokenType(TokenType.BEARER)
            .expired(false)
            .revoked(false)
            .build();
    tokenRepository.save(token);
  }
  public User finduserById(Integer id){
    return  repository.findById(id).orElseThrow(()-> new UserNotFoundException("user by id"+id+"notfound"));


  }
  public forgetpassresponse forgetPassword(forgetpassrequest request) throws Exception {
    User user = repository.findByEmail(request.getEmail())
            .orElseThrow(() -> new Exception("User not found"));

    var jwtToken = jwtService.generateToken(user);
    revokeAllUserTokens(user);
    saveUserToken(user, jwtToken);


    String resetPasswordLink = "http://localhost:4200/forgetpass2?token="+jwtToken ;


    EmailSender emailSender = new EmailSender();
    String subject = "Reset Password";
    String body = "Vous pouvez réinitialiser votre mot de passe en cliquant sur le lien ci-dessous.<br> Une fois que vous avez cliqué sur le lien, vous serez dirigé vers une page où vous pourrez créer un nouveau mot de passe sécurisé pour votre compte.<br> Assurez-vous de choisir un mot de passe fort et de le garder en sécurité pour protéger votre compte. <br> lien: " + resetPasswordLink;
    emailSender.sendEmail(user.getEmail(), subject, body);
    var msg1 = "gggg";
    return forgetpassresponse.builder().msg(msg1).build();
  }

  private void revokeAllUserTokens(User user) {
    var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());
    if (validUserTokens.isEmpty())
      return;
    validUserTokens.forEach(token -> {
      token.setExpired(true);
      token.setRevoked(true);
    });
    tokenRepository.saveAll(validUserTokens);
  }

  public List<User> findAllUsers() {
    return repository.findAll();
  }
  @Transactional
  public void deleteUserAndTokensById(Integer id) {
    Optional<User> userOptional = repository.findById(id);
    if (userOptional.isPresent()) {
      User user = userOptional.get();
      List<Token> tokens = tokenRepository.findByUser(user);
      tokenRepository.deleteAll(tokens);
      repository.delete(user);
    } else {
      throw new UserNotFoundException("User not found with ID: " + id);
    }





}
  public void updateUser(Integer id, User newUser) {
    User user = repository.findById(id)
            .orElseThrow(() -> new UserNotFoundException("User not found with ID: " + id));

    if (newUser.getFirstname() != null) {
      user.setFirstname(newUser.getFirstname());
    }
    if (newUser.getLastname() != null) {
      user.setLastname(newUser.getLastname());
    }
    if (newUser.getEmail() != null) {
      user.setEmail(newUser.getEmail());
    }
    if (newUser.getRole() != null) {
      user.setRole(newUser.getRole());
    }

    repository.save(user);
  }
  public User finduserByemail(String email){
    return  repository.findByEmail(email).orElseThrow(()-> new UserNotFoundException("user by id"+email+"notfound"));


  }

  public List<User> getUsersByRole(Role roleName) {
    return repository.findByRole(roleName);
  }
}
