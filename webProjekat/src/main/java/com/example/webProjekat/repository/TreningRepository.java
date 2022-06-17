package com.example.webProjekat.repository;

import com.example.webProjekat.model.Trening;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TreningRepository extends JpaRepository<Trening, Long> {

    List<Trening> findByTipTreningaContainsAndTrajanjeBetween(String tip, Integer minTrajanje, Integer maxTrajanje);
}
