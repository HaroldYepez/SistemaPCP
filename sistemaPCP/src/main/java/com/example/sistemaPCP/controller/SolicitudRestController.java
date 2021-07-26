package com.example.sistemaPCP.controller;

import java.util.List;

import com.example.sistemaPCP.model.Solicitud;
import com.example.sistemaPCP.Service.api.SolicitudService;
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

@RestController
@RequestMapping(value = "/api/solicitud/")
@CrossOrigin("*")
public class SolicitudRestController {

    @Autowired
    private SolicitudService solicitudService;

    @GetMapping(value = "/all")
    public List<Solicitud> getAll() {
        return solicitudService.getAll();
    }

    @GetMapping(value = "/find/{id}")
    public Solicitud find(@PathVariable Long id) {
        return solicitudService.get(id);
    }

    @PostMapping(value = "/save")
    public ResponseEntity<Solicitud> save(@RequestBody Solicitud solicitud) {
        Solicitud obj = solicitudService.save(solicitud);
        return new ResponseEntity<Solicitud>(obj, HttpStatus.OK);
    }

    @GetMapping(value = "/delete/{id}")
    public ResponseEntity<Solicitud> delete(@PathVariable Long id) {
        Solicitud solicitud = solicitudService.get(id);
        if (solicitud != null) {
            solicitudService.delete(id);
        } else {
            return new ResponseEntity<Solicitud>(solicitud, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<Solicitud>(solicitud, HttpStatus.OK);

    }

}
