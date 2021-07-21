package com.example.sistemaPCP.controller;

import java.util.List;

import com.example.sistemaPCP.Service.api.ActividadService;
import com.example.sistemaPCP.model.Actividad;

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
@RequestMapping(value = "/api/actividad/")
@CrossOrigin("*")
public class ActividadRestController {
    @Autowired
    private ActividadService actividadService;

    @GetMapping(value = "/all")
    public List<Actividad> getAll() {
        return actividadService.getAll();
    }

    @GetMapping(value = "/find/{id}")
    public Actividad find(@PathVariable Long id) {
        return actividadService.get(id);
    }

    @PostMapping(value = "/save")
    public ResponseEntity<Actividad> save(@RequestBody Actividad actividad) {
        Actividad obj = actividadService.save(actividad);
        return new ResponseEntity<Actividad>(obj, HttpStatus.OK);
    }

    @GetMapping(value = "/delete/{id}")
    public ResponseEntity<Actividad> delete(@PathVariable Long id) {
        Actividad actividad = actividadService.get(id);
        if (actividad != null) {
            actividadService.delete(id);
        } else {
            return new ResponseEntity<Actividad>(actividad, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<Actividad>(actividad, HttpStatus.OK);

    }

    @GetMapping(value = "/SoliAct/{id}")
    public List<Actividad> listaActividad(@PathVariable Long id) {
        return actividadService.listaActividad(id);
    }

}
