package com.example.sistemaPCP.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "actividad")
public class Actividad {
    @Id
    private Long id_actividad;
    
    @Column(length=10485760)
    private String descripcion_acti;
    private float precTotal;

    public Actividad(Long id_actividad, String descripcion_acti, float precTotal) {
        this.id_actividad = id_actividad;
        this.descripcion_acti = descripcion_acti;
        this.precTotal = precTotal;
    }

    public Actividad() {
    }

    public Long getId_actividad() {
        return id_actividad;
    }

    public void setId_actividad(Long id_actividad) {
        this.id_actividad = id_actividad;
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

    @Override
    public String toString() {
        return "Actividad [descripcion_acti=" + descripcion_acti + ", id_actividad=" + id_actividad + ", precTotal="
                + precTotal + "]";
    }

}
