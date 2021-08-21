package com.example.sistemaPCP.model;

import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Embeddable;
import javax.persistence.EmbeddedId;


@Embeddable
@Entity
@Table(name = "solicitud_tramite")
public class Solicitud_Tramite {

    @Id
    @Column(name = "solicitud_num_solicitud")
    public String solicitud_num_solicitud;

    @Column(name = "tramite_num_tramite")
    public String tramite_num_tramite;

    public String getsolicitud_num_solicitud() {
        return solicitud_num_solicitud;
    }
    public void setsolicitud_num_solicitud(String solicitud_num_solicitud) {
        this.solicitud_num_solicitud = solicitud_num_solicitud;
    }

    public String gettramite_num_tramite() {
        return tramite_num_tramite;
    }
    public void settramite_num_tramite(String tramite_num_tramite) {
        this.tramite_num_tramite = tramite_num_tramite;
    }
    
}
    

