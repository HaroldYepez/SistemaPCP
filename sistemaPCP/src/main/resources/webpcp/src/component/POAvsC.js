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
        
        return (
            
            <Container style={{background: 'white', padding:'1%'}}>
                <Table>
                <Col>
                    
                    <thead>                        
                        <th>ActividadPoa</th>
                        <th>Presupuesto Asignado</th>
                        <th>Unidad Requerimiento</th>
                        <th>Solicitud Asignada</th>
                        <th>Solicitudes Cuantificados monto referencial</th>
                        <th>Porcentaje</th>
                        
                    
                    </thead>
                    <tbody>
                        {this.state.solicitud.map((elemento)=>(
                           
                            <tr>
                                <td>{elemento.requerimiento.actividad.descripcion_acti}</td>
                                <td>{elemento.requerimiento.valorPresupuesto}</td>
                                <td>{elemento.unidad.siglas}</td>
                                <td>{elemento.numSolicitud}</td>
                                <td>{elemento.montoRef}</td>
                                <td>{(parseInt(elemento.montoRef)*100)/elemento.requerimiento.valorPresupuesto+ "%"}</td>
                               
                                
                                


                               
                            </tr>
                            
                        ))}
                    </tbody>
                    </Col>
                </Table>
            </Container>
        )
    };

   
}
