package com.example.sistemaPCP.Model;

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
    private Long id_requerimiento;
    private String descripcion;
    private Float valorPresupuesto;
    private String cuentaPresupuestaria;

    public Long getId() {
        return id_requerimiento;
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