package com.example.sistemaPCP.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "requerimiento")
public class Requerimiento {
    @Id
    private Long id_requerimiento;
    @Column(length = 10485760)
    private String descripcion;
    private Float valorPresupuesto;
    @ManyToOne
    @JoinColumn(name = "id_actividad")
    private Actividad actividad;

    public Requerimiento(Long id_requerimiento, String descripcion, Float valorPresupuesto, Actividad actividad) {
        this.id_requerimiento = id_requerimiento;
        this.descripcion = descripcion;
        this.valorPresupuesto = valorPresupuesto;
        this.actividad = actividad;
    }

    public Requerimiento() {
    }

    public Long getId_requerimiento() {
        return id_requerimiento;
    }

    public void setId_requerimiento(Long id_requerimiento) {
        this.id_requerimiento = id_requerimiento;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Float getValorPresupuesto() {
        return valorPresupuesto;
    }

    public void setValorPresupuesto(Float valorPresupuesto) {
        this.valorPresupuesto = valorPresupuesto;
    }

    public Actividad getActividad() {
        return actividad;
    }

    public void setActividad(Actividad actividad) {
        this.actividad = actividad;
    }

}