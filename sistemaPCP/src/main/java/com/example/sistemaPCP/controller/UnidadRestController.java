package com.example.sistemaPCP.controller;

import java.util.List;

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

import com.example.sistemaPCP.model.*;
import com.example.sistemaPCP.Service.api.*;

@RestController
@RequestMapping(value = "/api/unidad/")
@CrossOrigin("*")
public class UnidadRestController {

    @Autowired
    private UnidadService unidadService;

    @GetMapping(value = "/all")
    public List<Unidad> getAll() {
        return unidadService.getAll();
    }

    @GetMapping(value = "/find/{id}")
    public Unidad find(@PathVariable Long id) {
        return unidadService.get(id);
    }

    @PostMapping(value = "/save")
    public ResponseEntity<Unidad> save(@RequestBody Unidad unidad) {
        Unidad obj = unidadService.save(unidad);
        return new ResponseEntity<Unidad>(obj, HttpStatus.OK);
    }

    @GetMapping(value = "/delete/{id}")
    public ResponseEntity<Unidad> delete(@PathVariable Long id) {
        Unidad unidad = unidadService.get(id);
        if (unidad != null) {
            unidadService.delete(id);
        } else {
            return new ResponseEntity<Unidad>(unidad, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<Unidad>(unidad, HttpStatus.OK);

    }

}
