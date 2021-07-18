package com.example.sistemaPCP.Service.impl;

import com.example.sistemaPCP.Commons.GenericServiceImpl;
import com.example.sistemaPCP.model.Requerimiento;
import com.example.sistemaPCP.Service.api.RequerimientoService;
import com.example.sistemaPCP.dao.api.RequerimientoDaoApi;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

@Service
public class RequerimientoServiceImpl extends GenericServiceImpl<Requerimiento, Long> implements RequerimientoService {
    @Autowired
    private RequerimientoDaoApi requerimientoDaoAPi;

    @Override
    public CrudRepository<Requerimiento, Long> getDao() {
        return requerimientoDaoAPi;
    }

}
