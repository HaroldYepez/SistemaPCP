package com.example.sistemaPCP.model;

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
    private Integer id_unidad;
    private String nombre;
    private String siglas;
    private String Tipo;
    private Integer unidadSAF;

    public Integer getId() {
        return id_unidad;
    }

    public Unidad(String nombre, String siglas, String tipo, Integer unidadSAF) {
        this.nombre = nombre;
        this.siglas = siglas;
        Tipo = tipo;
        this.unidadSAF = unidadSAF;
    }

    public void setId(Integer id) {
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
