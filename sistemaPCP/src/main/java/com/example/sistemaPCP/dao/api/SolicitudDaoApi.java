package com.example.sistemaPCP.dao.api;

import java.util.List;

import com.example.sistemaPCP.model.Solicitud;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface SolicitudDaoApi extends CrudRepository<Solicitud, Long> {

    @Query(value = "SELECT * FROM solicitud where EXTRACT(YEAR FROM solicitud.fecha_solicitud) = :year and solicitud.id_requerimiento is NOT null and solicitud.num_solicitud NOT LIKE '%TEMP%'", nativeQuery = true)
    List<Solicitud> listaSolicitud(@Param("year") Long year);

}
