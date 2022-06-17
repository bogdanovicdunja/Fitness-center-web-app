package com.example.webProjekat.service;

import com.example.webProjekat.model.FitnessCentar;
import com.example.webProjekat.model.Korisnik;
import com.example.webProjekat.model.Uloga;

import java.util.List;


public interface KorisnikService {

    Korisnik findByKorisnickoImeAndLozinka(String korisnickoIme, String lozinka);

    Korisnik save(Korisnik korisnik);

    Korisnik findByKorisnickoIme(String korisnickoIme);

    List<Korisnik> findByUlogaAndAktivan(Uloga uloga, Boolean aktivan);

    Korisnik getOne(Long id);

    List<Korisnik> findByUloga(Uloga uloga);

    void deleteById(Long id);

    List<Korisnik> findByFitnessCentar(FitnessCentar fitnessCentar);




}
