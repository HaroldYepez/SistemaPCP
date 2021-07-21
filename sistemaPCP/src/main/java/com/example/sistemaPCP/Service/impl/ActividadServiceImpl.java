package com.example.sistemaPCP.Service.impl;

import java.util.List;

import com.example.sistemaPCP.Commons.GenericServiceImpl;
import com.example.sistemaPCP.Service.api.ActividadService;
import com.example.sistemaPCP.dao.api.ActividadDaoAPi;
import com.example.sistemaPCP.model.Actividad;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

@Service
public class ActividadServiceImpl extends GenericServiceImpl<Actividad, Long> implements ActividadService {
    @Autowired
    private ActividadDaoAPi actividadDaoAPi;

    @Override
    public CrudRepository<Actividad, Long> getDao() {
        return actividadDaoAPi;
    }
    @Override
    public List<Actividad> listaActividad(Long id) {
        return actividadDaoAPi.listaActividad(id);
    }
}
