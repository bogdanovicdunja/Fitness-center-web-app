package com.example.webProjekat.model;

import java.io.Serializable;

public class ProsecnaOcenaDTO implements Serializable {
    private double ocena;
    public ProsecnaOcenaDTO(){
    }
    public ProsecnaOcenaDTO(double ocena){
        this.ocena = ocena;
    }

    public double getOcena() {
        return ocena;
    }

    public void setOcena(double ocena) {
        this.ocena = ocena;
    }
}
