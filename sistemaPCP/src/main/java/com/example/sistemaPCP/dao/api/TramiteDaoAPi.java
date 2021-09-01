package com.example.sistemaPCP.dao.api;

import java.util.List;

import com.example.sistemaPCP.model.Tramite;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface TramiteDaoAPi extends CrudRepository<Tramite, Long> {

    @Query(value = "SELECT * FROM tramite where EXTRACT(YEAR FROM tramite.fecha_asignacion) = :year ", nativeQuery = true)
    List<Tramite> listaTramite(@Param("year") Long year);

}
