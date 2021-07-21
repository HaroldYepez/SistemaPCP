package com.example.sistemaPCP.dao.api;

import java.util.List;

import com.example.sistemaPCP.model.Actividad;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface ActividadDaoAPi extends CrudRepository<Actividad, Long> {

    @Query(value = "SELECT * FROM actividad where actividad.id_requerimiento= :id", nativeQuery = true)
    List<Actividad> listaActividad(@Param("id") Long id);

}
