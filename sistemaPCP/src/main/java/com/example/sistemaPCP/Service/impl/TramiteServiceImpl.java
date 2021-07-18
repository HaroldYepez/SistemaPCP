package com.example.sistemaPCP.Service.impl;

import com.example.sistemaPCP.Commons.GenericServiceImpl;
import com.example.sistemaPCP.model.Tramite;
import com.example.sistemaPCP.Service.api.TramiteService;
import com.example.sistemaPCP.dao.api.TramiteDaoAPi;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

@Service
public class TramiteServiceImpl extends GenericServiceImpl<Tramite, Long> implements TramiteService {
    @Autowired
    private TramiteDaoAPi tramiteDaoAPi;

    @Override
    public CrudRepository<Tramite, Long> getDao() {
        return tramiteDaoAPi;
    }
}
