package com.recetteapp.security.Domaine;

import com.recetteapp.security.project.project;
import com.recetteapp.security.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface Domainerepo  extends JpaRepository<Domaine, Integer> {

    Optional<Domaine> findByName(String name);


    List<Domaine> findByVavorga(User vavorga);
}
