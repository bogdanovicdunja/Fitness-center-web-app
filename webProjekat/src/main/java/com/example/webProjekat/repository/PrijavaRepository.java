package com.example.webProjekat.repository;

import com.example.webProjekat.model.Korisnik;
import com.example.webProjekat.model.Prijava;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

public interface PrijavaRepository extends JpaRepository<Prijava, Long> {

  List<Prijava> findByKorisnik(Korisnik korisnik);

  List<Prijava> findByOdradjenAndKorisnik_KorisnickoIme(Boolean odradjen, String korisnickoIme);

  List<Prijava> findByOdradjenAndKorisnik_KorisnickoImeAndOcenaEquals(Boolean odradjen, String korisnickoIme, Integer ocena);

  List<Prijava> findByOdradjenAndKorisnik_KorisnickoImeAndOcenaGreaterThan(Boolean odradjen, String korisnickoIme, Integer ocena);

  Long countPrijavasByTermin_Id(Long terminId);

  Boolean existsPrijavaByTermin_IdAndKorisnik_KorisnickoIme(Long terminId, String korisnickoIme);


  List<Prijava> findByTermin_Trening_Korisnik_KorisnickoIme(String korisnickoIme);
}
