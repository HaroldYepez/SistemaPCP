package com.example.sistemaPCP.model;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "tramite")
public class Tramite {
    @Id
    private Long numTramite;
    private Float totalCofRef;
    private Date fechaAsignacion;
    @ManyToOne
    @JoinColumn(name = "id_analista")
    private Analista analista;
    @ManyToOne
    @JoinColumn(name = "id_unidad")
    private Unidad unidad;
    private Float subtotal;
    private Float iva;
    private String tareaActual;
    private Float montoContractual;
    private String tipoProcedimiento;

    public Float getTotalCofRef() {
        return totalCofRef;
    }

    public void setTotalCofRef(Float totalCofRef) {
        this.totalCofRef = totalCofRef;
    }

    public Date getFechaAsignacion() {
        return fechaAsignacion;
    }

    public void setFechaAsignacion(Date fechaAsignacion) {
        this.fechaAsignacion = fechaAsignacion;
    }

    public Analista getAnalista() {
        return analista;
    }

    public void setAnalista(Analista analista) {
        this.analista = analista;
    }

    public Unidad getUnidad() {
        return unidad;
    }

    public void setUnidad(Unidad unidad) {
        this.unidad = unidad;
    }

    public Float getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(Float subtotal) {
        this.subtotal = subtotal;
    }

    public Float getIva() {
        return iva;
    }

    public void setIva(Float iva) {
        this.iva = iva;
    }

    public String getTareaActual() {
        return tareaActual;
    }

    public void setTareaActual(String tareaActual) {
        this.tareaActual = tareaActual;
    }

    public Float getMontoContractual() {
        return montoContractual;
    }

    public void setMontoContractual(Float montoContractual) {
        this.montoContractual = montoContractual;
    }

    public String getTipoProcedimiento() {
        return tipoProcedimiento;
    }

    public void setTipoProcedimiento(String tipoProcedimiento) {
        this.tipoProcedimiento = tipoProcedimiento;
    }

}
