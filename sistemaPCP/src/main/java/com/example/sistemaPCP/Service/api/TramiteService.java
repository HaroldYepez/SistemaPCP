package com.example.sistemaPCP.Service.api;

import java.util.List;

import com.example.sistemaPCP.Commons.GenericServiceAPi;
import com.example.sistemaPCP.model.Tramite;

public interface TramiteService extends GenericServiceAPi<Tramite, Long> {
    List<Tramite> listaTramite(Long year);
}
