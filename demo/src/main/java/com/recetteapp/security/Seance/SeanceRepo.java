package com.recetteapp.security.Seance;


import com.recetteapp.security.Domaine.Domaine;
import com.recetteapp.security.project.project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.User;

import java.util.List;

public interface SeanceRepo extends JpaRepository<Seance, Integer> {
    List<Seance> findByProjectid(project projectid);
    List<Seance> findSeanceByProjectidId(Integer projectidId);
    List<Seance> findByEtatsAndEmailSent(String seanceterminer, boolean b);
    List<Seance> findByProjectidDomaineidVavorgaEmailAndStatutAndEtats(String email,String statut,String Etats);
    List<Seance> findByProjectidDomaineidVavorgaEmail(String email);
    List<Seance> findByStatut(String statut);
    List<Seance> findByStatutAndEmailrapSent(String statut, boolean c);
}
