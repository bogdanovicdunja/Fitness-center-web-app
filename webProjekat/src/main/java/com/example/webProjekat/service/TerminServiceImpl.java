package com.example.webProjekat.service;

import com.example.webProjekat.model.Termin;
import com.example.webProjekat.repository.TerminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Service
public class TerminServiceImpl implements TerminService{
    @Autowired
    TerminRepository terminRepository;

    @Override
    public Termin getOne(Long id) {
        return terminRepository.getOne(id);
    }

    @Override
    public List<Termin> findAll() {
        return terminRepository.findAll();
    }

    @Override
    public List<Termin>  findBySortCenaASC(){
        return terminRepository.findByOrderByCenaAsc();
    }

    @Override
    public List<Termin> findBySortCenaDESC(){
        return terminRepository.findByOrderByCenaDesc();
    }

    @Override
    public List<Termin> findBySortVremeASC(){ return terminRepository.findByOrderByVremeTerminaAsc(); }

    @Override
    public List<Termin> findBySortVremeDESC(){return terminRepository.findByOrderByVremeTerminaDesc();}

    @Override
    public Termin save(Termin termin) {
        return terminRepository.save(termin);
    }

    @Override
    public List<Termin> pretraga(String naziv, String opis, LocalDateTime pocetnoVreme, LocalDateTime krajnjeVreme, String tip, Integer minCena, Integer maxCena) {
        return terminRepository.findAllByTrening_NazivContainsAndTrening_OpisContainsAndVremeTerminaBetweenAndTrening_TipTreningaAndCenaBetween(naziv, opis, pocetnoVreme, krajnjeVreme, tip, minCena, maxCena);
    }
}
