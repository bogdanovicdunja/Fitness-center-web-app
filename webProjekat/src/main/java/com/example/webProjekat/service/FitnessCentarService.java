package com.example.webProjekat.service;

import com.example.webProjekat.model.FitnessCentar;

import java.util.List;

public interface FitnessCentarService {

    FitnessCentar save(FitnessCentar fitnessCentar);

    List<FitnessCentar> findAll();

    void delete(Long id);

    FitnessCentar getOne(Long id);
}
