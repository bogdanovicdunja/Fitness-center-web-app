package com.example.webProjekat.controller;

import com.example.webProjekat.model.Korisnik;
import com.example.webProjekat.model.Uloga;
import com.example.webProjekat.service.KorisnikService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class KorisnikController {

    @Autowired
    KorisnikService korisnikService;

    @CrossOrigin
    @PostMapping("/prijava")
    public ResponseEntity<Korisnik> postPrijava(@RequestBody Korisnik korisnikPodaci){
        Korisnik korisnik = korisnikService.findByKorisnickoImeAndLozinka(korisnikPodaci.getKorisnickoIme(), korisnikPodaci.getLozinka());
        if(korisnik == null || !korisnik.getAktivan()){ //ako ne postoji u bazi i ako je false, tj. ceka odobrenje od administratora

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);  //ne moze da se prijavi, status not found
        }
        else{
            return new ResponseEntity<>(korisnik, HttpStatus.OK);   //prosao prijavu, znaci da smo ga nasli u bazi podataka sa tim kor imenom  i lozinkom
        }
    }

    @CrossOrigin
    @PostMapping("/registracija-clan")
    public ResponseEntity<Korisnik> postRegistracijaClan(@RequestBody Korisnik korisnik){
        korisnik.setAsClan();              //uloga korisnika sajta
        korisnik.setAktivan(false);       //postavljamo mu status na false, ceka odobrenje od administratora
        Korisnik registrovanKorisnik = korisnikService.save(korisnik);
        return new ResponseEntity<>(registrovanKorisnik, HttpStatus.OK); //uspesno popunio formu za registraciju
    }

    @CrossOrigin
    @PostMapping("/registracija-trener")
    public ResponseEntity<Korisnik> postRegistracijaTrener(@RequestBody Korisnik korisnik){
        korisnik.setAsTrener();
        korisnik.setAktivan(false);     //postavljamo mu status na false
        Korisnik registrovanKorisnik = korisnikService.save(korisnik);
        return new ResponseEntity<>(registrovanKorisnik, HttpStatus.OK);
    }


    @CrossOrigin
    @GetMapping("/neaktivni-clanovi")                     //lista clanova koji cekaju odobrenje od admina
    public List<Korisnik> getNeaktivniClanovi(){            //lista korisnika cija je uloga CLAN i status aktivnosti FALSE
        return korisnikService.findByUlogaAndAktivan(Uloga.CLAN, false);
    }

    @CrossOrigin
    @GetMapping("/neaktivni-treneri")   //lista trenera koji cekaju odobrenje od admina
    public List<Korisnik> getNeaktivniTreneri(){            //lista korisnika cija je uloga TRENER i status aktivnosti FALSE
        return korisnikService.findByUlogaAndAktivan(Uloga.TRENER, false);
    }

    @CrossOrigin
    @PostMapping("/odobravanje-zahteva/{id}")
        public ResponseEntity<Korisnik> postOdobravanjeZahteva(@PathVariable Long id){
        Korisnik korisnik = korisnikService.getOne(id);     //dobavljamo korisnika po parametru ID, zato je @PathVariable
        korisnik.setAktivan(true);                          //zahtev odobren korisniku, postavljamo na true

        Korisnik odobrenKorisnik = korisnikService.save(korisnik);
        return new ResponseEntity<>(odobrenKorisnik, HttpStatus.OK);
    }


//****************************** provera uloge preko kontrolera **************************************
    @CrossOrigin
    @GetMapping(value = "/korisnikClan/{id}")
    public ResponseEntity<Korisnik> getClan(@PathVariable("id") Long id){
        Korisnik korisnik = korisnikService.getOne(id);
        if(korisnik.getUloga() != Uloga.CLAN){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(korisnik, HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping(value = "/korisnikAdmin/{id}")
    public ResponseEntity<Korisnik> getAdmin(@PathVariable("id") Long id){
        Korisnik korisnik = korisnikService.getOne(id);
        if(korisnik.getUloga() != Uloga.ADMINISTRATOR){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(korisnik, HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping(value = "/korisnikTrener/{id}")
    public ResponseEntity<Korisnik> getTrener(@PathVariable("id") Long id){
        Korisnik korisnik = korisnikService.getOne(id);
        if(korisnik.getUloga() != Uloga.TRENER){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(korisnik, HttpStatus.OK);
    }

//***************************************************************************************************

    @CrossOrigin
    @GetMapping(value = "/korisnik/{korisnickoIme}")    //profil.js
    public Korisnik getKorisnikByKorisnickoIme(@PathVariable("korisnickoIme") String korisnickoIme){
        return korisnikService.findByKorisnickoIme(korisnickoIme);
    }

    @CrossOrigin
    @GetMapping("/treneri") //svi treneri
    public List<Korisnik> getTreneri(){
        return korisnikService.findByUloga(Uloga.TRENER);
    }

    @CrossOrigin
    @DeleteMapping("/treneri/{id}") //brisanje trenera
    public ResponseEntity<HttpStatus> deleteTrener(@PathVariable Long id){
        korisnikService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @CrossOrigin
    @PostMapping("/registracija-trener-admin")
    public ResponseEntity<Korisnik> postRegistracijaTrenerAdmin(@RequestBody Korisnik korisnik){
        korisnik.setAsTrener();
        korisnik.setAktivan(true);     //postavljamo mu status na true
        korisnik.setProsenaOcena(0.0);
        Korisnik registrovanKorisnik = korisnikService.save(korisnik);
        return new ResponseEntity<>(registrovanKorisnik, HttpStatus.OK);
    }

    @CrossOrigin
    @PutMapping("/izmenaClan")  //AZURIRANJE clana
    public Korisnik putClan(@RequestBody Korisnik korisnik){
        korisnik.setUloga(Uloga.CLAN);
        korisnik.setAktivan(true);
        return korisnikService.save(korisnik);
    }

    @CrossOrigin
    @GetMapping("/jedankorisnik/{id}")
    public Korisnik getJedanKorisnik(@PathVariable Long id){
        return korisnikService.getOne(id);
    }

}
