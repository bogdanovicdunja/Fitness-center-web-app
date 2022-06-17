package com.example.webProjekat.model;

import javax.persistence.*;
import java.io.Serializable;

@Entity
public class Prijava implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Boolean odradjen;

    @Column
    private Integer ocena;

    @ManyToOne(fetch = FetchType.LAZY)
    private Korisnik korisnik;

    @ManyToOne(fetch = FetchType.LAZY)
    private Termin termin;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getOcena() {
        return ocena;
    }

    public void setOcena(Integer ocena) {
        this.ocena = ocena;
    }

    public Korisnik getKorisnik() {
        return korisnik;
    }

    public void setKorisnik(Korisnik korisnik) {
        this.korisnik = korisnik;
    }

    public Termin getTermin() {
        return termin;
    }

    public void setTermin(Termin termin) {
        this.termin = termin;
    }

    public Boolean getOdradjen() {
        return odradjen;
    }

    public void setOdradjen(Boolean odradjen) {
        this.odradjen = odradjen;
    }
}
