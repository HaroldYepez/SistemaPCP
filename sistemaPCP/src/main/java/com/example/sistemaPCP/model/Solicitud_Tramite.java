package com.example.sistemaPCP.model;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "solicitud_tramite")
public class Solicitud_Tramite {

    @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "oid")
    public Long oid;

    @Column(name = "solicitud_num_solicitud")
    public String solicitud_num_solicitud;
    
    
    @Column(name = "tramite_num_tramite")
    public String tramite_num_tramite;

    public String getsolicitud_num_solicitud() {
        return this.solicitud_num_solicitud;
    }
    public void setsolicitud_num_solicitud(String solicitud_num_solicitud) {
        this.solicitud_num_solicitud = solicitud_num_solicitud;
    }

    public String gettramite_num_tramite() {
        return this.tramite_num_tramite;
    }
    public void settramite_num_tramite(String tramite_num_tramite) {
        this.tramite_num_tramite = tramite_num_tramite;
    }
    
    public Long getOid(){
        return this.oid;
    }

    public void setOid(Long oid){
        this.oid = oid;
    }
}
    

