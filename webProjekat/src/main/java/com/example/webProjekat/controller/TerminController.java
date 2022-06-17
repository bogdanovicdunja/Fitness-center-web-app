package com.example.webProjekat.controller;

import com.example.webProjekat.model.Termin;
import com.example.webProjekat.service.TerminService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@RestController
public class TerminController {
    @Autowired
    TerminService terminService;

    @CrossOrigin
    @GetMapping("/termini")
    public List<Termin> getTermini(){
        return terminService.findAll();
    }

    @CrossOrigin
    @GetMapping("termini/cenaASC")
    public List<Termin> getTerminiSortedByCenaASC(){
        return terminService.findBySortCenaASC();
    }


    @CrossOrigin
    @GetMapping("termini/cenaDESC")
    public List<Termin> getTerminiSortedByCenaDESC(){
        return terminService.findBySortCenaDESC();
    }

    @CrossOrigin
    @GetMapping("termini/vremeASC")
    public List<Termin> getTerminiSortedByVremeASC(){
        return terminService.findBySortVremeASC();
    }

    @CrossOrigin
    @GetMapping("termini/vremeDESC")
    public List<Termin> getTerminiSortedByVremeDESC(){
        return terminService.findBySortVremeDESC();
    }


    @CrossOrigin
    @PostMapping("termini") //cuvamo napravljeni termin
    public ResponseEntity<Termin> postTermin(@RequestBody Termin termin){
        return new ResponseEntity<>(terminService.save(termin), HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("termini/{id}") //DOBAVLJANJE termina sa prosledjenim id-em
    public Termin getTermin(@PathVariable Long id){
        return terminService.getOne(id);
    }


    @CrossOrigin
    @GetMapping("terminiPretraga")  //kombinovana pretraga treninzi.js
    public List<Termin> getTerminiPretraga(@RequestParam String naziv, @RequestParam String opis,
                                           @RequestParam  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime minVreme, @RequestParam  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime maxVreme, @RequestParam String tip,
                                           @RequestParam Integer minCena, @RequestParam Integer maxCena){
        return terminService.pretraga(naziv, opis, minVreme, maxVreme, tip, minCena, maxCena);
    }

    @CrossOrigin
    @PutMapping("termini")  //azuriranje termina Trener
    public ResponseEntity<Termin> putTermin(@RequestBody Termin termin){
        return new ResponseEntity<>(terminService.save(termin), HttpStatus.OK);
    }



}
