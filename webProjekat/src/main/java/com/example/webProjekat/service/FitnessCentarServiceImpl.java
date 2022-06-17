package com.example.webProjekat.service;

import com.example.webProjekat.model.FitnessCentar;
import com.example.webProjekat.repository.FitnessCentarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FitnessCentarServiceImpl implements FitnessCentarService{
    @Autowired
    FitnessCentarRepository fitnessCentarRepository;

    @Override
    public FitnessCentar save(FitnessCentar fitnessCentar) {
        return fitnessCentarRepository.save(fitnessCentar);
    }

    @Override
    public List<FitnessCentar> findAll() {
        return fitnessCentarRepository.findAll();
    }

    @Override
    public void delete(Long id) {
        fitnessCentarRepository.deleteById(id);
    }

    @Override
    public FitnessCentar getOne(Long id) {
        return fitnessCentarRepository.getOne(id);
    }
}
