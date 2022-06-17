package com.example.webProjekat.service;

import com.example.webProjekat.model.Sala;

import java.util.List;

public interface SalaService {

    List<Sala> findAll();

    Sala save(Sala sala);

    void delete(Long id);

    Sala getOne(Long id);


}
