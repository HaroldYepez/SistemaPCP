package com.example.sistemaPCP.service;

import java.util.List;
import java.util.Optional;

import com.example.sistemaPCP.model.Unidad;
import com.example.sistemaPCP.repo.UnidadRepositorio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UnidadService {
    @Autowired
    private UnidadRepositorio unidadRepository;

    public Unidad create(Unidad unidad) {

        return unidadRepository.save(unidad);
    }

    public List<Unidad> getAllUnidad() {
        return unidadRepository.findAll();
    }

    public void delete(Unidad unidad) {

        unidadRepository.delete(unidad);
    }

    public Optional<Unidad> findById(Integer id) {

        return unidadRepository.findById(id);
    }

}
