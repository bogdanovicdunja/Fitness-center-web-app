package com.example.webProjekat.repository;

import com.example.webProjekat.model.Termin;
import com.example.webProjekat.model.Trening;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

public interface TerminRepository extends JpaRepository<Termin, Long> {

    List<Termin> findByOrderByCenaAsc();

    List<Termin> findByOrderByCenaDesc();

    List<Termin> findByOrderByVremeTerminaAsc();

    List<Termin> findByOrderByVremeTerminaDesc();

    List<Termin> findAllByTrening_NazivContainsAndTrening_OpisContainsAndVremeTerminaBetweenAndTrening_TipTreningaAndCenaBetween(String naziv, String opis, LocalDateTime pocetnoVreme, LocalDateTime krajnjeVreme, String tip, Integer minCena, Integer maxCena);


}
