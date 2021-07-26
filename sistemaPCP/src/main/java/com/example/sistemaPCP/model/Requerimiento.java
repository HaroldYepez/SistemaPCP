package com.example.sistemaPCP.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "requerimiento")
public class Requerimiento {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id_requerimiento;
    private String descripcion;
    private Float valorPresupuesto;
    private String cuentaPresupuestaria;
    @ManyToOne
    @JoinColumn(name = "id_actividad", nullable = false)
    private Actividad actividad;

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

    public String getCuentaPresupuestaria() {
        return cuentaPresupuestaria;
    }

    public void setCuentaPresupuestaria(String cuentaPresupuestaria) {
        this.cuentaPresupuestaria = cuentaPresupuestaria;
    }
    public Actividad getActividad() {
        return actividad;
    }

    public void setActividad(Actividad actividad) {
        this.actividad = actividad;
    }

}