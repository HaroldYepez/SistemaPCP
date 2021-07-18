package com.example.sistemaPCP.controller;

import java.util.List;

import com.example.sistemaPCP.model.Tramite;
import com.example.sistemaPCP.Service.api.TramiteService;

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
@RequestMapping(value = "/api/tramite/")
@CrossOrigin("*")
public class TramiteRestController {

    @Autowired
    private TramiteService tramiteService;

    @GetMapping(value = "/all")
    public List<Tramite> getAll() {
        return tramiteService.getAll();
    }

    @GetMapping(value = "/find/{id}")
    public Tramite find(@PathVariable Long id) {
        return tramiteService.get(id);
    }

    @PostMapping(value = "/save")
    public ResponseEntity<Tramite> save(@RequestBody Tramite tramite) {
        Tramite obj = tramiteService.save(tramite);
        return new ResponseEntity<Tramite>(obj, HttpStatus.OK);
    }

    @GetMapping(value = "/delete/{id}")
    public ResponseEntity<Tramite> delete(@PathVariable Long id) {
        Tramite tramite = tramiteService.get(id);
        if (tramite != null) {
            tramiteService.delete(id);
        } else {
            return new ResponseEntity<Tramite>(tramite, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<Tramite>(tramite, HttpStatus.OK);

    }

}
