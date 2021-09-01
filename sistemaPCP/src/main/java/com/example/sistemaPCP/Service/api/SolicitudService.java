package com.example.sistemaPCP.Service.api;

import java.util.List;

import com.example.sistemaPCP.Commons.GenericServiceAPi;
import com.example.sistemaPCP.model.Solicitud;

public interface SolicitudService extends GenericServiceAPi<Solicitud, Long> {
    List<Solicitud> listaSolicitud(Long year);
}
