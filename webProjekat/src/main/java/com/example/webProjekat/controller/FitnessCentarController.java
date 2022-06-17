package com.example.webProjekat.controller;

import com.example.webProjekat.model.FitnessCentar;
import com.example.webProjekat.model.Korisnik;
import com.example.webProjekat.model.Sala;
import com.example.webProjekat.service.FitnessCentarService;
import com.example.webProjekat.service.KorisnikService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class FitnessCentarController {

    @Autowired
    FitnessCentarService fitnessCentarService;
    @Autowired
    KorisnikService korisnikService;

    @CrossOrigin
    @PostMapping("/fitness-centar") //prima "napravljen" fitness centar
    public ResponseEntity<FitnessCentar> postFitnessCentar(@RequestBody FitnessCentar fitnessCentar){
        FitnessCentar sacuvanFitnessCentar = fitnessCentarService.save(fitnessCentar);  //cuvanje napravljenog fitness centra
        return new ResponseEntity<>(sacuvanFitnessCentar, HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("/fitness-centar")  //lista svih FC
    public List<FitnessCentar> getAll(){
        return fitnessCentarService.findAll();
    }

    @CrossOrigin
    @GetMapping("/fitness-centar/{id}")    //dobavljanje centra koji se menja
    public FitnessCentar getOneCentar(@PathVariable Long id){
        return fitnessCentarService.getOne(id);
    }

    @CrossOrigin
    @DeleteMapping("/fitness-centar/{id}")
    public ResponseEntity<HttpStatus> deleteFitnessCentar(@PathVariable Long id){
        FitnessCentar fitnessCentar = fitnessCentarService.getOne(id);
        List<Korisnik> korisnici = korisnikService.findByFitnessCentar(fitnessCentar);
        for(Korisnik korisnik : korisnici){
            korisnik.setFitnessCentar(null);
            korisnikService.save(korisnik);
        }

        fitnessCentarService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @CrossOrigin
    @PutMapping("/fitness-centar")    //azuriranje centra
    public FitnessCentar putCentar(@RequestBody FitnessCentar centar){
        return fitnessCentarService.save(centar);
    }

}