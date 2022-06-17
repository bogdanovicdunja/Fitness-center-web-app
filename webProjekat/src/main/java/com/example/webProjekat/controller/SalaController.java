package com.example.webProjekat.controller;

import com.example.webProjekat.model.FitnessCentar;
import com.example.webProjekat.model.Sala;
import com.example.webProjekat.service.FitnessCentarService;
import com.example.webProjekat.service.SalaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class SalaController {

    @Autowired
    SalaService salaService;

    @Autowired
    FitnessCentarService fitnessCentarService;

    @CrossOrigin
    @GetMapping("/sala")    //lista svih sala
    public List<Sala> getSala(){
        return salaService.findAll();
    }


    @CrossOrigin
    @PostMapping("/sala")   //kreirana sala se cuva
    public ResponseEntity<Sala> postSala(@RequestBody Sala sala){
        return new ResponseEntity<>(salaService.save(sala), HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("/sala/{id}")    //dobavljanje sale koja se menja
    public Sala getOneSala(@PathVariable Long id){
        return salaService.getOne(id);
    }

    @CrossOrigin
    @PutMapping("/sala")    //azuriranje sale
    public Sala putSala(@RequestBody Sala sala){
        return salaService.save(sala);
    }

    @CrossOrigin
    @DeleteMapping("/sala/{id}")    //brisanje sale
    public ResponseEntity<HttpStatus> deleteSala(@PathVariable Long id){
        salaService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
