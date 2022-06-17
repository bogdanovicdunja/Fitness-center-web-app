package com.example.webProjekat.service;

import com.example.webProjekat.model.Korisnik;
import com.example.webProjekat.model.Prijava;
import com.example.webProjekat.model.Termin;
import com.example.webProjekat.repository.PrijavaRepository;
import com.example.webProjekat.repository.TerminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PrijavaServiceImpl implements PrijavaService{

    @Autowired
    PrijavaRepository prijavaRepository;

    @Autowired
    TerminRepository terminRepository;

    @Override
    public Prijava save(Prijava prijava) {
        return prijavaRepository.save(prijava);
    }

    @Override
    public List<Prijava> findByKorisnik(Korisnik korisnik) {
        return prijavaRepository.findByKorisnik(korisnik);
    }

    @Override
    public void delete(Long id) {
        prijavaRepository.deleteById(id);
    }

    @Override
    public Prijava getOne(Long id) {
        return prijavaRepository.getOne(id);
    }

    @Override
    public List<Prijava> findByOdradjenAndKorisnik_KorisnickoIme(Boolean odradjen, String korisnickoIme) {
        return prijavaRepository.findByOdradjenAndKorisnik_KorisnickoIme(odradjen, korisnickoIme);
    }

    @Override
    public List<Prijava> findByOdradjenAndKorisnik_KorisnickoImeAndOcenaEquals(Boolean odradjen, String korisnickoIme, Integer ocena) {
        return prijavaRepository.findByOdradjenAndKorisnik_KorisnickoImeAndOcenaEquals(odradjen, korisnickoIme, ocena);
    }

    @Override
    public List<Prijava> findByOdradjenAndKorisnik_KorisnickoImeAndOcenaGreaterThan(Boolean odradjen, String korisnickoIme, Integer ocena) {
        return prijavaRepository.findByOdradjenAndKorisnik_KorisnickoImeAndOcenaGreaterThan(odradjen, korisnickoIme, ocena);
    }

    @Override
    public Boolean jestePunTermin(Long terminId) {
        Long brojPrijava = prijavaRepository.countPrijavasByTermin_Id(terminId);

        Termin termin = terminRepository.getOne(terminId);
        return brojPrijava >= termin.getSala().getKapacitet();
    }

    @Override
    public Boolean existsPrijavaByTermin_IdAndKorisnik_KorisnickoIme(Long terminId, String korisnickoIme) {
        return prijavaRepository.existsPrijavaByTermin_IdAndKorisnik_KorisnickoIme(terminId, korisnickoIme);
    }

    @Override
    public List<Prijava> findByTermin_Trening_Korisnik_KorisnickoIme(String korisnickoIme) {
        return prijavaRepository.findByTermin_Trening_Korisnik_KorisnickoIme(korisnickoIme);
    }
}
