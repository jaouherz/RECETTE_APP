package com.recetteapp.security.Feedback;

import com.recetteapp.security.Domaine.Domaine;
import com.recetteapp.security.Seance.Seance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FeedbackRepo  extends JpaRepository<Feedback, Integer> {
    Feedback findBySeanceid(Seance seance);
    void deleteBySeanceid(Seance seance);

}
