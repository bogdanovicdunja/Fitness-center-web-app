package com.example.webProjekat.service;

import com.example.webProjekat.model.Korisnik;
import com.example.webProjekat.model.Prijava;

import java.time.LocalDateTime;
import java.util.List;

public interface PrijavaService {

    Prijava save(Prijava prijava);

    List<Prijava> findByKorisnik(Korisnik korisnik);

    void delete(Long id);

    Prijava getOne(Long id);

    List<Prijava> findByOdradjenAndKorisnik_KorisnickoIme(Boolean odradjen, String korisnickoIme);

    List<Prijava> findByOdradjenAndKorisnik_KorisnickoImeAndOcenaEquals(Boolean odradjen, String korisnickoIme, Integer ocena);

    List<Prijava> findByOdradjenAndKorisnik_KorisnickoImeAndOcenaGreaterThan(Boolean odradjen, String korisnickoIme, Integer ocena);

    Boolean jestePunTermin(Long terminId);

    Boolean existsPrijavaByTermin_IdAndKorisnik_KorisnickoIme(Long terminId, String korisnickoIme);

    List<Prijava> findByTermin_Trening_Korisnik_KorisnickoIme(String korisnickoIme);



}
