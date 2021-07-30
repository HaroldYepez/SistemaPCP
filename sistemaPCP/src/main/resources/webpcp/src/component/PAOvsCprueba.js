import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { TramiteService } from '../services/TramiteService';
import { UnidadService } from '../services//UnidadService';
import { ActividadService } from '../services/ActividadService';
import { SolicitudService } from '../services/SolicitudService';
import { Col } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Table from 'react-bootstrap/Table'
import { FcViewDetails } from 'react-icons/fc';
import Button from 'react-bootstrap/Button'
import './estilos.css';
import { RequerimientoService } from '../services/RequerimientoService';
import { CertificacionService } from '../services/CertificacionService';
export default class POAvsCPrueba extends Component {
    constructor() {
        super();
        this.state = {
            tramite: [],
            certificacion:[],
            unidad:[],    
            listaCertificacion:[],
            solicitud:[],
        }
        this.tramiteService = new TramiteService();
        this.actividadService=new ActividadService();
        this.unidadService=new UnidadService();
        this.solicitudService=new SolicitudService();
        this.certificacionService=new CertificacionService()
        getCertificaciones = () => {

        }

    }
}
