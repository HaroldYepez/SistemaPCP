package com.example.sistemaPCP.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "actividad")
public class Actividad {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id_actividad;
    @ManyToOne
    @JoinColumn(name = "id_requerimiento")
    private Requerimiento requerimiento;
    private String descripcion_acti;
    private float precTotal;

    public Long getId_actividad() {
        return id_actividad;
    }

    public void setId_actividad(Long id_actividad) {
        this.id_actividad = id_actividad;
    }

    public Requerimiento getRequerimiento() {
        return requerimiento;
    }

    public void setRequerimiento(Requerimiento requerimiento) {
        this.requerimiento = requerimiento;
    }

    public String getDescripcion_acti() {
        return descripcion_acti;
    }

    public void setDescripcion_acti(String descripcion_acti) {
        this.descripcion_acti = descripcion_acti;
    }

    public float getPrecTotal() {
        return precTotal;
    }

    public void setPrecTotal(float precTotal) {
        this.precTotal = precTotal;
    }

}
