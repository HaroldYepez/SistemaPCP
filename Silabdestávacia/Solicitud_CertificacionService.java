package com.example.sistemaPCP.Service.api;

import java.util.List;

import com.example.sistemaPCP.model.Solicitud_Certificacion;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Solicitud_CertificacionService extends CrudRepository<Solicitud_Certificacion, Integer>{
    List<Solicitud_Certificacion> findAll();
    
}