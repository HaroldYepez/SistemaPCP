package com.example.sistemaPCP.Service.api;

import java.util.List;

import com.example.sistemaPCP.Commons.GenericServiceAPi;
import com.example.sistemaPCP.model.Actividad;

public interface ActividadService extends GenericServiceAPi<Actividad, Long> {
    List<Actividad> listaActividad(Long id);

}
