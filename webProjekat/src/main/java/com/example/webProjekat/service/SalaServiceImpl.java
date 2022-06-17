package com.example.webProjekat.service;

import com.example.webProjekat.model.Sala;
import com.example.webProjekat.repository.SalaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SalaServiceImpl implements SalaService {
    @Autowired
    SalaRepository salaRepository;
    @Override
    public List<Sala> findAll() {
        return salaRepository.findAll();
    }

    @Override
    public Sala save(Sala sala) {
        return salaRepository.save(sala);
    }

    @Override
    public void delete(Long id) {
        salaRepository.deleteById(id);
    }

    @Override
    public Sala getOne(Long id) {
        return salaRepository.getOne(id);
    }
}
