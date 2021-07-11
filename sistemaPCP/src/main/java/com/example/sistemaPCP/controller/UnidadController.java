package com.example.sistemaPCP.controller;

import com.example.sistemaPCP.model.Unidad;
import com.example.sistemaPCP.service.UnidadService;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/unidad/")
public class UnidadController {
    @Autowired
    private UnidadService unidadService;

    @PostMapping
    private ResponseEntity<Unidad> guardar(@RequestBody Unidad unidad) {
        Unidad temporal = unidadService.create(unidad);
        try {
            return ResponseEntity.created(new URI("/api/unidad" + temporal.getId())).body(temporal);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();

        }
    }

    @GetMapping
    private ResponseEntity<List<Unidad>> ListarTodasLasUnidades() {
        return ResponseEntity.ok(unidadService.getAllUnidad());
    }

    @DeleteMapping
    private ResponseEntity<Void> eliminarUnidad(@RequestBody Unidad unidad) {
        unidadService.delete(unidad);
        return ResponseEntity.ok().build();
    }

    @GetMapping(name = "get{id}")
    private ResponseEntity<Optional<Unidad>> ListarUnidadesId(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(unidadService.findById(id));
    }

}