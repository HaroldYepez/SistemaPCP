package com.example.sistemaPCP.controller;

import java.util.List;

import com.example.sistemaPCP.model.Certificacion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.sistemaPCP.Service.api.*;

@RestController
@RequestMapping(value = "/api/certificacion/")
@CrossOrigin("*")
public class CertificacionRestController {

    @Autowired
    private CertificacionService certificacionService;

    @GetMapping(value = "/all")
    public List<Certificacion> getAll() {
        return certificacionService.getAll();
    }

    @GetMapping(value = "/find/{id}")
    public Certificacion find(@PathVariable Long id) {
        return certificacionService.get(id);
    }

    @PostMapping(value = "/save")
    public ResponseEntity<Certificacion> save(@RequestBody Certificacion certificacion) {
        Certificacion obj = certificacionService.save(certificacion);
        return new ResponseEntity<Certificacion>(obj, HttpStatus.OK);
    }

    @GetMapping(value = "/delete/{id}")
    public ResponseEntity<Certificacion> delete(@PathVariable Long id) {
        Certificacion certificacion = certificacionService.get(id);
        if (certificacion != null) {
            certificacionService.delete(id);
        } else {
            return new ResponseEntity<Certificacion>(certificacion, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<Certificacion>(certificacion, HttpStatus.OK);

    }

}
