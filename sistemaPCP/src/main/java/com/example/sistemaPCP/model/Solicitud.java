package com.example.sistemaPCP.model;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "solicitud")
public class Solicitud {
    @Id
    private Integer numSolicitud;
    private Date datatime;
    private Float montoRef;
    private Integer plazoCotizacionRef;
    @ManyToOne
    @JoinColumn(name = "id_unidad")
    private Unidad unidad;
    @ManyToOne
    @JoinColumn(name = "id_requerimiento")
    private Requerimiento requerimiento;

    public Solicitud(Integer numSolicitud, Date datatime, Float montoRef, Integer plazoCotizacionRef, Unidad unidad,
            Requerimiento requerimiento) {
        this.numSolicitud = numSolicitud;
        this.datatime = datatime;
        this.montoRef = montoRef;
        this.plazoCotizacionRef = plazoCotizacionRef;
        this.unidad = unidad;
        this.requerimiento = requerimiento;
    }

    public Integer getNumSolicitud() {
        return numSolicitud;
    }

    public void setNumSolicitud(Integer numSolicitud) {
        this.numSolicitud = numSolicitud;
    }

    public Date getDatatime() {
        return datatime;
    }

    public void setDatatime(Date datatime) {
        this.datatime = datatime;
    }

    public Float getMontoRef() {
        return montoRef;
    }

    public void setMontoRef(Float montoRef) {
        this.montoRef = montoRef;
    }

    public Integer getPlazoCotizacionRef() {
        return plazoCotizacionRef;
    }

    public void setPlazoCotizacionRef(Integer plazoCotizacionRef) {
        this.plazoCotizacionRef = plazoCotizacionRef;
    }

    public Unidad getUnidad() {
        return unidad;
    }

    public void setUnidad(Unidad unidad) {
        this.unidad = unidad;
    }

    public Requerimiento getRequerimiento() {
        return requerimiento;
    }

    public void setRequerimiento(Requerimiento requerimiento) {
        this.requerimiento = requerimiento;
    }

}
