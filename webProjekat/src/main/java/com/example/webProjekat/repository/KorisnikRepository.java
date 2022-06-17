package com.example.webProjekat.repository;

import com.example.webProjekat.model.FitnessCentar;
import com.example.webProjekat.model.Korisnik;
import com.example.webProjekat.model.Uloga;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface KorisnikRepository extends JpaRepository<Korisnik, Long> {

    Korisnik findByKorisnickoImeAndLozinka(String korisnickoIme, String lozinka);
    Korisnik findByKorisnickoIme(String korisnickoIme);
    List<Korisnik> findByUlogaAndAktivan(Uloga uloga, Boolean aktivan);
    List<Korisnik> findByUloga(Uloga uloga);
    List<Korisnik> findByFitnessCentar(FitnessCentar fitnessCentar);

}
