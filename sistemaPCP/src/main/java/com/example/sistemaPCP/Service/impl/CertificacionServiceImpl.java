package com.example.sistemaPCP.Service.impl;

import com.example.sistemaPCP.Commons.GenericServiceImpl;
import com.example.sistemaPCP.model.Certificacion;
import com.example.sistemaPCP.Service.api.CertificacionService;
import com.example.sistemaPCP.dao.api.CertificacionDaoAPi;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

@Service
public class CertificacionServiceImpl extends GenericServiceImpl<Certificacion, Long> implements CertificacionService {
    @Autowired
    private CertificacionDaoAPi certificacionDaoAPi;

    @Override
    public CrudRepository<Certificacion, Long> getDao() {
        return certificacionDaoAPi;
    }

}
