package com.recetteapp.security.user;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

  Optional<User> findByEmail(String email);


  Optional<User> findById(Integer id);

  List<User> findByRole(Role roleName);
}
