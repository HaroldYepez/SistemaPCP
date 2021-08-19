package com.example.sistemaPCP.Service.api;

import java.util.List;

import com.example.sistemaPCP.model.Solicitud_Tramite;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Solicitud_TramiteService extends CrudRepository<Solicitud_Tramite, Integer>{
    List<Solicitud_Tramite> findAll();
    
}