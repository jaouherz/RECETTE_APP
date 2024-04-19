package com.recetteapp.security.project;

import com.recetteapp.security.Domaine.Domaine;
import com.recetteapp.security.Seance.Seance;
import com.recetteapp.security.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProjectRepository extends JpaRepository<project, Integer> {
    Optional<project> findProjectById(Integer id);

    List<project> findProjectByDomaineid( Domaine  domaineid);
    List<project>findProjectByDomaineidVavorgaEmail(String email);
    List<project> findProjectByEtat(String etat);
    Optional<project> findByName(String name);


}
