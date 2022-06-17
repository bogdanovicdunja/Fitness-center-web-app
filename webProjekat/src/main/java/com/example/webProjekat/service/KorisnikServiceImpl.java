package com.example.webProjekat.service;

import com.example.webProjekat.model.FitnessCentar;
import com.example.webProjekat.model.Korisnik;
import com.example.webProjekat.model.Uloga;
import com.example.webProjekat.repository.KorisnikRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KorisnikServiceImpl implements  KorisnikService{
    @Autowired
    KorisnikRepository korisnikRepository;

    @Override
    public Korisnik findByKorisnickoImeAndLozinka(String korisnickoIme, String lozinka) {
        return korisnikRepository.findByKorisnickoImeAndLozinka(korisnickoIme, lozinka);
    }

    @Override
    public Korisnik save(Korisnik korisnik) {
        return korisnikRepository.save(korisnik);
    }

    @Override
    public Korisnik findByKorisnickoIme(String korisnickoIme) {
        return korisnikRepository.findByKorisnickoIme(korisnickoIme);
    }

    @Override
    public List<Korisnik> findByUlogaAndAktivan(Uloga uloga, Boolean aktivan) {
        return korisnikRepository.findByUlogaAndAktivan(uloga, aktivan);
    }

    @Override
    public Korisnik getOne(Long id) {
        return korisnikRepository.getOne(id);
    }

    @Override
    public List<Korisnik> findByUloga(Uloga uloga) {
        return korisnikRepository.findByUloga(uloga);
    }

    @Override
    public void deleteById(Long id) {
        korisnikRepository.deleteById(id);
    }

    @Override
    public List<Korisnik> findByFitnessCentar(FitnessCentar fitnessCentar) {
        return korisnikRepository.findByFitnessCentar(fitnessCentar);
    }


}
