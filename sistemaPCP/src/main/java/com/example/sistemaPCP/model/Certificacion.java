package com.example.sistemaPCP.model;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "certificacion")
public class Certificacion {
    @Id
    private Long noCertificacion;

    @ManyToOne
    @JoinColumn(name = "numTramite", nullable = false)
    private Tramite tramite;
    private Integer partida;
    private Integer fuente;
    private Float total;

    public Long getNoCertificacion() {
        return noCertificacion;
    }

    public void setNoCertificacion(Long noCertificacion) {
        this.noCertificacion = noCertificacion;
    }

    public Tramite getTramite() {
        return tramite;
    }

    public void setTramite(Tramite tramite) {
        this.tramite = tramite;
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
