package com.example.sistemaPCP.Service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import com.example.sistemaPCP.Service.api.UnidadService;
import com.example.sistemaPCP.dao.api.UnidadDaoAPi;
import com.example.sistemaPCP.Commons.GenericServiceImpl;
import com.example.sistemaPCP.model.*;

@Service
public class UnidadServiceImpl extends GenericServiceImpl<Unidad, Long> implements UnidadService {
    @Autowired
    private UnidadDaoAPi unidadDaoAPi;

    @Override
    public CrudRepository<Unidad, Long> getDao() {
        return unidadDaoAPi;
    }

}
