package com.example.webProjekat.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Termin implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Integer brojPrijavljenihClanova;

    @Column
    private Integer cena;

    @Column
    private LocalDateTime vremeTermina;

    @ManyToOne(fetch = FetchType.LAZY, cascade=CascadeType.ALL)
    private Trening trening;

    @ManyToOne(fetch = FetchType.LAZY)
    private Sala sala;

    @ManyToOne(fetch = FetchType.LAZY)
    private FitnessCentar fitnessCentar;

    @JsonIgnore
    @OneToMany(mappedBy = "termin", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Prijava> prijave = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getBrojPrijavljenihClanova() {
        return brojPrijavljenihClanova;
    }

    public void setBrojPrijavljenihClanova(Integer brojPrijavljenihClanova) {
        this.brojPrijavljenihClanova = brojPrijavljenihClanova;
    }

    public Integer getCena() {
        return cena;
    }

    public void setCena(Integer cena) {
        this.cena = cena;
    }

    public Trening getTrening() {
        return trening;
    }

    public void setTrening(Trening trening) {
        this.trening = trening;
    }

    public Sala getSala() {
        return sala;
    }

    public void setSala(Sala sala) {
        this.sala = sala;
    }

    public FitnessCentar getFitnessCentar() {
        return fitnessCentar;
    }

    public void setFitnessCentar(FitnessCentar fitnessCentar) {
        this.fitnessCentar = fitnessCentar;
    }

    public Set<Prijava> getPrijave() {
        return prijave;
    }

    public void setPrijave(Set<Prijava> prijave) {
        this.prijave = prijave;
    }

    public LocalDateTime getVremeTermina() {
        return vremeTermina;
    }

    public void setVremeTermina(LocalDateTime vremeTermina) {
        this.vremeTermina = vremeTermina;
    }
}


