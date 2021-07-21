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


export default class POAvsC extends Component {
    constructor() {
        super();
        this.state = {
            tramite: [],
            actividad:[],
            unidad:[],
            solicitud:[],
            requerimeinto:[],
            lista:[]
        };
        this.tramiteService = new TramiteService();
        this.actividadService=new ActividadService();
        this.unidadService=new UnidadService();
        this.solicitudService=new SolicitudService();
        this.requerimientoSevice=new RequerimientoService();
    }

    despedirse=()=>{
        this.unidadService.getAll().then(data=>
            this.setState({unidad:data})
        );
        this.solicitudService.getAll().then(data=>
            this.setState({solicitud:data})
        );   
    };

    listarActividad=()=>{
        console.log("holi")
        console.log(this.state)
        
        //this.setState({lista: (this.solicitudService.listarActividades(elemento.requerimiento.id))})
    };

    componentDidMount() {
        this.despedirse();
        this.listarActividad();
    }

    render() {
        console.log(this.state)
        this.state.solicitud.map((elemento)=>(
            console.log(this.solicitudService.listarActividades(elemento.requerimiento))
        ))
        console.log("aqui")
        return (
            
            <Container>
                <Table>
                    <thead>
                        
                        <th>Solicitudes</th>
                        <th>Unidad Requiriente</th>
                        <th>Monto Referencial</th>
                        <th>Presupuesto Asignado</th>
                        <th>Actividad</th>
                        
                        
                       
                    </thead>
                    <tbody>
                        {this.state.solicitud.map((elemento)=>(
                           
                            <tr>
                                <td>{elemento.numSolicitud}</td>
                                <td>{elemento.unidad.siglas}</td>
                                <td>{elemento.montoRef}</td>
                                <td>{elemento.requerimiento.valorPresupuesto}</td>
                            </tr>
                            
                        ))}
                    </tbody>
                </Table>
            </Container>
        )
    };

   
}
