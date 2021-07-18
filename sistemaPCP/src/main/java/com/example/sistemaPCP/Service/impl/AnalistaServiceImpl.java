package com.example.sistemaPCP.Service.impl;

import com.example.sistemaPCP.Commons.GenericServiceImpl;
import com.example.sistemaPCP.model.Analista;
import com.example.sistemaPCP.Service.api.AnalistaService;
import com.example.sistemaPCP.dao.api.AnalistaDaoAPi;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

@Service
public class AnalistaServiceImpl extends GenericServiceImpl<Analista, Long> implements AnalistaService {
    @Autowired
    private AnalistaDaoAPi analistaDaoAPi;

    @Override
    public CrudRepository<Analista, Long> getDao() {
        return analistaDaoAPi;
    }
}
