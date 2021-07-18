package com.example.sistemaPCP.controller;

import java.util.List;

import com.example.sistemaPCP.model.Analista;
import com.example.sistemaPCP.Service.api.AnalistaService;

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
@RequestMapping(value = "/api/analista/")
@CrossOrigin("*")
public class AnalistaRestController {
    @Autowired
    private AnalistaService analistaService;

    @GetMapping(value = "/all")
    public List<Analista> getAll() {
        return analistaService.getAll();
    }

    @GetMapping(value = "/find/{id}")
    public Analista find(@PathVariable Long id) {
        return analistaService.get(id);
    }

    @PostMapping(value = "/save")
    public ResponseEntity<Analista> save(@RequestBody Analista analista) {
        Analista obj = analistaService.save(analista);
        return new ResponseEntity<Analista>(obj, HttpStatus.OK);
    }

    @GetMapping(value = "/delete/{id}")
    public ResponseEntity<Analista> delete(@PathVariable Long id) {
        Analista analista = analistaService.get(id);
        if (analista != null) {
            analistaService.delete(id);
        } else {
            return new ResponseEntity<Analista>(analista, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<Analista>(analista, HttpStatus.OK);

    }
}
