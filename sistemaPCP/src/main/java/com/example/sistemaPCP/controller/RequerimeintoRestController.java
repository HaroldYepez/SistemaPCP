package com.example.sistemaPCP.controller;

import java.util.List;

import com.example.sistemaPCP.Service.api.*;
import com.example.sistemaPCP.model.Requerimiento;
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
@RequestMapping(value = "/api/requerimiento/")
@CrossOrigin("*")
public class RequerimeintoRestController {
    @Autowired
    private RequerimientoService requerimientoService;

    @GetMapping(value = "/all")
    public List<Requerimiento> getAll() {
        return requerimientoService.getAll();
    }

    @GetMapping(value = "/find/{id}")
    public Requerimiento find(@PathVariable Long id) {
        return requerimientoService.get(id);
    }

    @PostMapping(value = "/save")
    public ResponseEntity<Requerimiento> save(@RequestBody Requerimiento requerimiento) {
        Requerimiento obj = requerimientoService.save(requerimiento);
        return new ResponseEntity<Requerimiento>(obj, HttpStatus.OK);
    }

    @GetMapping(value = "/delete/{id}")
    public ResponseEntity<Requerimiento> delete(@PathVariable Long id) {
        Requerimiento requerimeinto = requerimientoService.get(id);
        if (requerimeinto != null) {
            requerimientoService.delete(id);
        } else {
            return new ResponseEntity<Requerimiento>(requerimeinto, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<Requerimiento>(requerimeinto, HttpStatus.OK);

    }

}
