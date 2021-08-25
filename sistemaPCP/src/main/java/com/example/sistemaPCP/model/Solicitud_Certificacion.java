package com.example.sistemaPCP.model;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;



@Entity
@Table(name = "solicitud_certificacion")
public class Solicitud_Certificacion {
    
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "oid")
    public Long oid;
    
    @Column(name = "solicitud_num_solicitud")
    public String solicitud_num_solicitud;
    
    @Column(name = "certificacion_oid")
    public Integer certificacion_oid;

    public String getsolicitud_num_solicitud() {
        return solicitud_num_solicitud;
    }
    public void setsolicitud_num_solicitud(String solicitud_num_solicitud) {
        this.solicitud_num_solicitud = solicitud_num_solicitud;
    }

    public Integer getcertificacion_oid() {
        return certificacion_oid;
    }
    public void setcertificacion_oid(Integer certificacion_oid) {
        this.certificacion_oid = certificacion_oid;
    }
    
}
    

