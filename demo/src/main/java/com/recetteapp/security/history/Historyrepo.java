package com.recetteapp.security.history;

import com.recetteapp.security.Seance.Seance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface Historyrepo extends JpaRepository<History, Integer> {
    List<History> findByIdprojet(Integer id);
}
