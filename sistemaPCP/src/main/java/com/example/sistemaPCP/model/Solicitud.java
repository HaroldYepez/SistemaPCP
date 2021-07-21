package com.example.sistemaPCP.model;

import java.sql.Date;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.CascadeType;

@Entity
@Table(name = "solicitud")
public class Solicitud {
    @Id
    private Long numSolicitud;
    private Date fechaSolicitud;
    private Float montoRef;
    private Integer plazoCotizacionRef;
    @ManyToOne
    @JoinColumn(name = "id_unidad")
    private Unidad unidad;
    @ManyToOne
    @JoinColumn(name = "id_requerimiento")
    private Requerimiento requerimiento;

    @ManyToMany
    @JoinTable(name = "actividad", joinColumns = { @JoinColumn(name = "id_requerimiento") }, inverseJoinColumns = {
            @JoinColumn(name = "id_requerimeinto") })
    private List<Actividad> actividades;

    public Long getNumSolicitud() {
        return numSolicitud;
    }

    public void setNumSolicitud(Long numSolicitud) {
        this.numSolicitud = numSolicitud;
    }

    public Date getDatatime() {
        return fechaSolicitud;
    }

    public void setDatatime(Date datatime) {
        this.fechaSolicitud = datatime;
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