package com.example.webProjekat.controller;

import com.example.webProjekat.model.Trening;
import com.example.webProjekat.service.TerminService;
import com.example.webProjekat.service.TreningService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TreningController {
    @Autowired
    TreningService treningService;

    @CrossOrigin
    @GetMapping("/treninzi")    //svi treninzi
    public List<Trening> getTreninzi(){
        return treningService.findAll();
    }

    @CrossOrigin
    @GetMapping("/treninzi/pretraga/")
    public List<Trening> getTreninziByTip(@RequestParam String tip, @RequestParam Integer minTrajanje, @RequestParam Integer maxTrajanje){
        return treningService.findByTipTreningaAndTrajanjeBetween(tip, minTrajanje, maxTrajanje);
    }

    @CrossOrigin
    @PostMapping("/treninzi")
    public ResponseEntity<Trening> postTrening(@RequestBody Trening trening){
        return new ResponseEntity<>(treningService.save(trening), HttpStatus.OK);
    }

}