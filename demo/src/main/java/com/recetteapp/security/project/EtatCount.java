package com.recetteapp.security.project;

public class EtatCount {
    private String etat;
    private Long number;

    public EtatCount(String etat, Long number) {
        this.etat = etat;
        this.number = number;
    }

    public String getEtat() {
        return etat;
    }

    public void setEtat(String etat) {
        this.etat = etat;
    }

    public Long getNumber() {
        return number;
    }

    public void setNumber(Long number) {
        this.number = number;
    }
}
