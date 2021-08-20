package com.example.sistemaPCP.controller;

import java.util.List;


import com.example.sistemaPCP.Service.api.Solicitud_TramiteService;
import com.example.sistemaPCP.model.Solicitud_Tramite;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/solicitud_tramite/")
@CrossOrigin("*")
public class Solicitud_TramiteController {

    @Autowired
    private Solicitud_TramiteService solicitud_TramiteService;
    
    @GetMapping(value = "/all")
    public List<Solicitud_Tramite> getAll(){
        return solicitud_TramiteService.findAll();
    }
    
    
    
}