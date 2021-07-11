package com.example.sistemaPCP.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "requerimiento")
public class Requerimiento {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id_requerimiento;
    private String descripcion;
    private Float valorPresupuesto;
    private String cuentaPresupuestaria;

    public Integer getId() {
        return id_requerimiento;
    }

    public void setId(Integer id) {
        this.id_requerimiento = id;
    }

    public Requerimiento(String descripcion, Float valorPresupuesto, String cuentaPresupuestaria) {
        this.descripcion = descripcion;
        this.valorPresupuesto = valorPresupuesto;
        this.cuentaPresupuestaria = cuentaPresupuestaria;
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
