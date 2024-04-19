package com.recetteapp.security.user2;

import com.recetteapp.security.user.User;
import com.recetteapp.security.user.User2;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface user2repo extends JpaRepository<User2, Integer> {

    Optional<User2> findByEmail(String email);
    List<User2>  findByProfile(String profile);
}
