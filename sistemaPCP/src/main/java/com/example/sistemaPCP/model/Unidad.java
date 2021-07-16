package com.example.sistemaPCP.Model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "unidad")
public class Unidad {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id_unidad;
    private String nombre;
    private String siglas;
    private String Tipo;
    private Integer unidadSAF;

    public Long getId() {
        return id_unidad;
    }

    public void setId(Long id) {
        this.id_unidad = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getSiglas() {
        return siglas;
    }

    public void setSiglas(String siglas) {
        this.siglas = siglas;
    }

    public String getTipo() {
        return Tipo;
    }

    public void setTipo(String tipo) {
        Tipo = tipo;
    }

    public Integer getUnidadSAF() {
        return unidadSAF;
    }

    public void setUnidadSAF(Integer unidadSAF) {
        this.unidadSAF = unidadSAF;
    }

}
