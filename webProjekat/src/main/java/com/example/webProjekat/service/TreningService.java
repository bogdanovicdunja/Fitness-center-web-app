package com.example.webProjekat.service;

import com.example.webProjekat.model.Trening;

import java.util.List;

public interface TreningService {

    Trening save(Trening trening);

    List<Trening> findAll();

    List<Trening> findByTipTreningaAndTrajanjeBetween(String tip, Integer minTrajanje, Integer maxTrajanje);

}