package com.example.sistemaPCP.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "certificacion")
public class Certificacion {
    @Id
    private Integer oid;
    private String noCertificacion;
    private Integer partida;
    private Integer fuente;
    private Float total;

    public Integer getOid() {
        return oid;
    }

    public void setOid(Integer oid) {
        this.oid = oid;
    }

    public String getNoCertificacion() {
        return noCertificacion;
    }

    public void setNoCertificacion(String noCertificacion) {
        this.noCertificacion = noCertificacion;
    }

    public Integer getPartida() {
        return partida;
    }

    public void setPartida(Integer partida) {
        this.partida = partida;
    }

    public Integer getFuente() {
        return fuente;
    }

    public void setFuente(Integer fuente) {
        this.fuente = fuente;
    }

    public Float getTotal() {
        return total;
    }

    public void setTotal(Float total) {
        this.total = total;
    }

}
