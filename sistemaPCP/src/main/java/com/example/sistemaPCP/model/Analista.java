package com.example.sistemaPCP.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "analista")
public class Analista {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id_analista;
    private String nombres;
    private String apellidos;
    private String cedula;

    public Long getId_analista() {
        return id_analista;
    }

    public void setId_analista(Long id_analista) {
        this.id_analista = id_analista;
    }

    public String getNombres() {
        return nombres;
    }

    public void setNombres(String nombres) {
        this.nombres = nombres;
    }

    public String getApellidos() {
        return apellidos;
    }

    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }

    public String getCedula() {
        return cedula;
    }

    public void setCedula(String cedula) {
        this.cedula = cedula;
    }

}
