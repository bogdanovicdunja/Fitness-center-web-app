package com.example.webProjekat.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

;
@Entity
public class Korisnik implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String korisnickoIme;

    @Column
    private String lozinka;

    @Column
    private String ime;

    @Column
    private String prezime;

    @Column
    private String kontaktTelefon;

    @Column
    private String eMail;

    @Column
    @DateTimeFormat(pattern = "yyyy-MM-dd") //nije htelo bez ovoga
    private Date datumRodjenja;

    @Column
    @Enumerated
    private Uloga uloga;

    @Column
    private Boolean aktivan;

    @Column
    private Double prosecnaOcena;

    @ManyToOne(fetch = FetchType.LAZY)
    private FitnessCentar fitnessCentar;


    @JsonIgnore
    @OneToMany(mappedBy = "korisnik", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Trening> treninzi = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "korisnik", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Prijava> prijave = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getKorisnickoIme() {
        return korisnickoIme;
    }

    public void setKorisnickoIme(String korisnickoIme) {
        this.korisnickoIme = korisnickoIme;
    }

    public String getLozinka() {
        return lozinka;
    }

    public void setLozinka(String lozinka) {
        this.lozinka = lozinka;
    }

    public String getIme() {
        return ime;
    }

    public void setIme(String ime) {
        this.ime = ime;
    }

    public String getPrezime() {
        return prezime;
    }

    public void setPrezime(String prezime) {
        this.prezime = prezime;
    }

    public String getKontaktTelefon() {
        return kontaktTelefon;
    }

    public void setKontaktTelefon(String kontaktTelefon) {
        this.kontaktTelefon = kontaktTelefon;
    }

    public String geteMail() {
        return eMail;
    }

    public void seteMail(String eMail) {
        this.eMail = eMail;
    }

    public Date getDatumRodjenja() {
        return datumRodjenja;
    }

    public void setDatumRodjenja(Date datumRodjenja) {
        this.datumRodjenja = datumRodjenja;
    }

    public Uloga getUloga() {
        return uloga;
    }

    public void setUloga(Uloga uloga) {
        this.uloga = uloga;
    }

    public Boolean getAktivan() {
        return aktivan;
    }

    public void setAktivan(Boolean aktivan) {
        this.aktivan = aktivan;
    }

    public Double getProsenaOcena() {
        return prosecnaOcena;
    }

    public void setProsenaOcena(Double prosenaOcena) {
        this.prosecnaOcena = prosenaOcena;
    }


    public FitnessCentar getFitnessCentar() {
        return fitnessCentar;
    }

    public void setFitnessCentar(FitnessCentar fitnessCentar) {
        this.fitnessCentar = fitnessCentar;
    }



    public Set<Trening> getTreninzi() {
        return treninzi;
    }

    public void setTreninzi(Set<Trening> treninzi) {
        this.treninzi = treninzi;
    }

    public Set<Prijava> getPrijave() {
        return prijave;
    }

    public void setPrijave(Set<Prijava> prijave) {
        this.prijave = prijave;
    }

    public void setAsClan(){    ///mora ovako jer je Uloga private
        this.uloga = Uloga.CLAN;
    }
    public void setAsTrener(){
        this.uloga = Uloga.TRENER;
    }
    public void setAsAdministrator(){
        this.uloga = Uloga.ADMINISTRATOR;
    }

    public static Uloga getClan(){
        return Uloga.CLAN;
    }
    public static Uloga getTrener(){
        return Uloga.TRENER;
    }
    public static Uloga getAdministrator(){
        return Uloga.ADMINISTRATOR;
    }



}
