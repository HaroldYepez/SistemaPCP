package com.example.sistemaPCP.Controller;

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

import com.example.sistemaPCP.Model.*;
import com.example.sistemaPCP.Service.api.*;

@RestController
@RequestMapping(value = "/api/v1/")
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
    public ResponseEntity<Unidad> save(@RequestBody Unidad persona) {
        Unidad obj = unidadService.save(persona);
        return new ResponseEntity<Unidad>(obj, HttpStatus.OK);
    }

}
