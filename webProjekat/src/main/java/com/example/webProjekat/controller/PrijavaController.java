package com.example.webProjekat.controller;

import com.example.webProjekat.model.*;
import com.example.webProjekat.repository.PrijavaRepository;
import com.example.webProjekat.service.KorisnikService;
import com.example.webProjekat.service.PrijavaService;
import com.example.webProjekat.service.TerminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
public class PrijavaController {
    @Autowired
    PrijavaService prijavaService;

    @Autowired
    KorisnikService korisnikService;

    @Autowired
    TerminService terminService;

    @CrossOrigin
    @PostMapping("/prijavaTreninga")    //prijavljivanje treninga; termin_profil.js
    public ResponseEntity<Prijava> postPrijava(@RequestParam String korisnickoIme, @RequestParam Long terminId){
        if(!prijavaService.jestePunTermin(terminId) && !prijavaService.existsPrijavaByTermin_IdAndKorisnik_KorisnickoIme(terminId, korisnickoIme)) {
            Termin termin = terminService.getOne(terminId);
            Korisnik korisnik = korisnikService.findByKorisnickoIme(korisnickoIme);
            Prijava prijava = new Prijava();
            prijava.setTermin(termin);
            prijava.setKorisnik(korisnik);
            prijava.setOcena(0);    //jos uvek neocenjen
            prijava.setOdradjen(false);

            return new ResponseEntity<>(prijavaService.save(prijava), HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @CrossOrigin
    @GetMapping("/prijavaTreninga/korisnik/{korisnickoIme}")    //prima korisnickoIme iz prijava_treninga_korisnik.js
    public List<Prijava> getPrijave(@PathVariable String korisnickoIme){
        Korisnik korisnik = korisnikService.findByKorisnickoIme(korisnickoIme); //pretrazuje bazu sa tim korImenom
        List<Prijava> prijave = prijavaService.findByKorisnik(korisnik);
        return prijave;     //vraca listu treninga koje je prijavio taj korisnik
    }

    @CrossOrigin
    @DeleteMapping("/prijavaTreninga/{id}") //otkazivanje prijave treninga - prima ID PRIJAVE, prijava_treninga_korisnik.js
    public ResponseEntity<HttpStatus> deletePrijava(@PathVariable Long id){
        prijavaService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @CrossOrigin
    @GetMapping("/prijavaTreninga/odradi/{id}") //nakon dugmeta odradi, menja se status odradjen=true, cuvamo ga kao takvog
    public ResponseEntity<HttpStatus> getOdradi(@PathVariable Long id){
        Prijava prijava = prijavaService.getOne(id);
        prijava.setOdradjen(true);
        prijavaService.save(prijava);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @CrossOrigin
    @GetMapping("/prijavaTreningaOdradjeni/korisnik/{korisnickoIme}")   //SVI ODRADJENI treninzi za nekog korisnika
    public List<Prijava> getPrijavaOdradjeni(@PathVariable String korisnickoIme){
        return prijavaService.findByOdradjenAndKorisnik_KorisnickoIme(true, korisnickoIme);
        // vraca treninge koje je korisnik prijavio i odradio
    }

    @CrossOrigin
    @GetMapping("/prijavaTreningaOdradjeniBezOcene/korisnik/{korisnickoIme}")   //odradjeni NEOCENJENI treninzi za nekog korisnika
    public List<Prijava> getPrijavaOdradjeniBezOcene(@PathVariable String korisnickoIme){
        return prijavaService.findByOdradjenAndKorisnik_KorisnickoImeAndOcenaEquals(true, korisnickoIme, 0); //pretrazuje na osnovu vremena termina u poredjenju sa trenutnim vremenom
    }

    @CrossOrigin
    @GetMapping("/prijavaTreningaOcenjivanje/{id}") //OCENJIVANJE treninga
    public ResponseEntity<HttpStatus> postaviOcenu(@PathVariable Long id, @RequestParam Integer ocena){
        Prijava prijava = prijavaService.getOne(id);
        prijava.setOcena(ocena);
        prijavaService.save(prijava);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("/prijavaTreningaOdradjeniSaOcenom/korisnik/{korisnickoIme}")   //odradjeni OCENJENI treninzi za nekog korisnika
    public List<Prijava> getPrijavaOdradjeniSaOcenom(@PathVariable String korisnickoIme){
        return prijavaService.findByOdradjenAndKorisnik_KorisnickoImeAndOcenaGreaterThan(true, korisnickoIme, 0); //pretrazuje na osnovu vremena termina u poredjenju sa trenutnim vremenom
    }

    @CrossOrigin
    @GetMapping("prosecnaocena/{id}")
    public ProsecnaOcenaDTO getPrijaveOcena(@PathVariable Long id){
        Korisnik korisnik = korisnikService.getOne(id);
        double zbirOcena = 0;
        double brojOcena = 0;
        List<Prijava> prijave = prijavaService.findByTermin_Trening_Korisnik_KorisnickoIme(korisnik.getKorisnickoIme());
        for(Prijava prijava : prijave) {
            if(prijava.getOcena() > 0){
                zbirOcena += prijava.getOcena();
                brojOcena++;
            }
        }
        if(brojOcena > 0){
            return new ProsecnaOcenaDTO(zbirOcena/brojOcena);
        }
        else{
            return new ProsecnaOcenaDTO(0);
        }
    }
}
