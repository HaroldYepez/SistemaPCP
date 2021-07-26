package com.example.sistemaPCP.Service.impl;

import com.example.sistemaPCP.Commons.GenericServiceImpl;
import com.example.sistemaPCP.model.Solicitud;
import com.example.sistemaPCP.Service.api.SolicitudService;
import com.example.sistemaPCP.dao.api.SolicitudDaoApi;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

@Service
public class SolicitudServiceImpl extends GenericServiceImpl<Solicitud, Long> implements SolicitudService {
    @Autowired
    private SolicitudDaoApi solicitudDaoAPi;

    @Override
    public CrudRepository<Solicitud, Long> getDao() {
        return solicitudDaoAPi;
    }

}
