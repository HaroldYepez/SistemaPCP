package com.example.sistemaPCP.model;

import java.sql.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "tramite")
public class Tramite {
    @Id
    private Long numTramite;
    private Float totalCotRef;
    private Date fechaAsignacion;
    @ManyToOne
    @JoinColumn(name = "id_analista", nullable = false)
    private Analista analista;

    @ManyToOne
    @JoinColumn(name = "id_unidad", nullable = false)
    private Unidad unidad;

    @JsonIgnore
    @OneToMany(mappedBy = "tramite")
    private List<Certificacion> certificacion;

    private Float subtotal;
    private Float iva;
    private String tareaActual;
    private Float montoContractual;
    private String tipoProcedimiento;
    private String objContratacion;

    public Long getNumTramite() {
        return numTramite;
    }

    public void setNumTramite(Long numTramite) {
        this.numTramite = numTramite;
    }

    public Float getTotalCotRef() {
        return totalCotRef;
    }

    public void setTotalCotRef(Float totalCotRef) {
        this.totalCotRef = totalCotRef;
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

    public List<Certificacion> getCertificacion() {
        return certificacion;
    }

    public void setCertificacion(List<Certificacion> certificacion) {
        this.certificacion = certificacion;
    }

    public void setTipoProcedimiento(String tipoProcedimiento) {
        this.tipoProcedimiento = tipoProcedimiento;
    }

    public String getObjContratacion() {
        return objContratacion;
    }

    public void setObjContratacion(String objContratacion) {
        this.objContratacion = objContratacion;
    }

}
