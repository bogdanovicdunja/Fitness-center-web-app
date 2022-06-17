package com.example.webProjekat.service;

import com.example.webProjekat.model.Termin;
import com.example.webProjekat.model.Trening;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

public interface TerminService {

    Termin getOne(Long id);

    List<Termin> findAll();

    List<Termin> findBySortCenaASC();

    List<Termin> findBySortCenaDESC();

    List<Termin> findBySortVremeASC();

    List<Termin> findBySortVremeDESC();

    Termin save(Termin termin);

    List<Termin> pretraga(String naziv, String opis, LocalDateTime pocetnoVreme, LocalDateTime krajnjeVreme, String tip, Integer minCena, Integer maxCena);


}
