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
    @JoinColumn(name = "id_actividad")
    private Actividad actividad;

    public Long getId() {
        return id_requerimiento;
    }

    public Actividad getActividad() {
        return actividad;
    }

    public void setActividad(Actividad actividad) {
        this.actividad = actividad;
    }

    public void setId(Long id) {
        this.id_requerimiento = id;
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

}