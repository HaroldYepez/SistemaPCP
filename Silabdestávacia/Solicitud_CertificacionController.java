package com.example.sistemaPCP.controller;

import java.util.List;

import com.example.sistemaPCP.Service.api.Solicitud_CertificacionService;

import com.example.sistemaPCP.model.Solicitud_Certificacion;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/solicitud_certificacion/")
@CrossOrigin("*")
public class Solicitud_CertificacionController {

    @Autowired
    private Solicitud_CertificacionService solicitud_CertificacionService;
    
    @GetMapping(value = "/all")
    public List<Solicitud_Certificacion> getAll(){
        return solicitud_CertificacionService.findAll();
    }
    
    
    
}