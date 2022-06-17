package com.example.webProjekat.service;

import com.example.webProjekat.model.Trening;
import com.example.webProjekat.repository.TreningRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TreningServiceImpl implements TreningService {
    @Autowired
    TreningRepository treningRepository;

    @Override
    public Trening save(Trening trening) {
        return treningRepository.save(trening);
    }

    @Override
    public List<Trening> findAll() {
        return treningRepository.findAll();
    }

    @Override
    public List<Trening> findByTipTreningaAndTrajanjeBetween(String tip, Integer minTrajanje, Integer maxTrajanje) {
        return treningRepository.findByTipTreningaContainsAndTrajanjeBetween(tip, minTrajanje, maxTrajanje);
    }
}