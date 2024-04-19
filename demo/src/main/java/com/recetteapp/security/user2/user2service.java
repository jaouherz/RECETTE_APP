package com.recetteapp.security.user2;

import com.recetteapp.security.auth.RegisterRequest;
import com.recetteapp.security.auth.registerresponse;
import com.recetteapp.security.exeption.UserNotFoundException;
import com.recetteapp.security.user.User;
import com.recetteapp.security.user.User2;
import com.recetteapp.security.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class user2service {
    private final user2repo repository;
    public User2 register(User2 request) {
        var existingUser = repository.findByEmail(request.getEmail());


        var user = User2.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .nbabs(0)
                .profile(request.getProfile())
                .build();
        var savedUser = repository.save(user);



        return User2.builder()
                .id(user.getId())
                .firstname(user.getFirstname())
                .email(user.getEmail())
                .lastname(user.getLastname())
                .nbabs(user.getNbabs())
                .profile(user.getProfile())

                .build();
    }
    public User2 update(Integer id , User2 request) {
        User2 existingUser = repository.findById(id) .orElseThrow(() -> new UserNotFoundException("User not found with ID: " + id));


        if (request.getFirstname() != null) {
            existingUser.setFirstname(request.getFirstname());
        }
        if (request.getLastname() != null) {
            existingUser.setLastname(request.getLastname());
        }
        if (request.getEmail() != null) {
            existingUser.setEmail(request.getEmail());
        }
        if (request.getProfile() != null) {
            existingUser.setProfile(request.getProfile());
        }if (request.getNbabs() != null) {
            existingUser.setNbabs(request.getNbabs());
        }

        var updatedUser = repository.save(existingUser);

        return User2.builder()
                .id(updatedUser.getId())
                .firstname(updatedUser.getFirstname())
                .email(updatedUser.getEmail())
                .lastname(updatedUser.getLastname())
                .nbabs(updatedUser.getNbabs())
                .profile(updatedUser.getProfile())
                .build();
    }
    public List<User2> findByprofile(String profile){
        return  repository.findByProfile(profile);


    }
    public User2 findBymail(String email){
        return  repository.findByEmail(email).orElseThrow(()-> new UserNotFoundException("user by id"+email+"notfound"));


    }
    public User2 findById(Integer id) {
        return repository.findById(id).orElseThrow(()-> new UserNotFoundException("user with id"+id+"notfound"));

    }

    public boolean deleteuser2(Integer id) {

        repository.deleteById(id);
return repository.findById(id).isEmpty();
    }
    public List<User2> findAllUsers() {
        return repository.findAll();
    }
}
