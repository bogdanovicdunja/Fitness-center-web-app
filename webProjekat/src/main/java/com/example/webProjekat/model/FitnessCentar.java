package com.example.webProjekat.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
public class FitnessCentar implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String naziv;

    @Column
    private  String adresa;

    @Column
    private String brojTelefona;

    @Column
    private String eMail;

    @JsonIgnore
    @OneToMany(mappedBy = "fitnessCentar", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Sala> sale = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "fitnessCentar", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Termin> termini = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "fitnessCentar", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Korisnik> korisnici = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNaziv() {
        return naziv;
    }

    public void setNaziv(String naziv) {
        this.naziv = naziv;
    }

    public String getAdresa() {
        return adresa;
    }

    public void setAdresa(String adresa) {
        this.adresa = adresa;
    }

    public String getBrojTelefona() {
        return brojTelefona;
    }

    public void setBrojTelefona(String brojTelefona) {
        this.brojTelefona = brojTelefona;
    }

    public String geteMail() {
        return eMail;
    }

    public void seteMail(String eMail) {
        this.eMail = eMail;
    }

    public Set<Sala> getSale() {
        return sale;
    }

    public void setSale(Set<Sala> sale) {
        this.sale = sale;
    }

    public Set<Korisnik> getKorisnici() {
        return korisnici;
    }

    public void setKorisnici(Set<Korisnik> korisnici) {
        this.korisnici = korisnici;
    }

    public Set<Termin> getTermini() {
        return termini;
    }

    public void setTermini(Set<Termin> termini) {
        this.termini = termini;
    }
}
