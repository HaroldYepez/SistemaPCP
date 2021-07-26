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
            listaActividad:[]

        };
        this.tramiteService = new TramiteService();
        this.actividadService=new ActividadService();
        this.unidadService=new UnidadService();
        this.solicitudService=new SolicitudService();
        this.requerimientoSevice=new RequerimientoService();
    }

    getActividades=()=>{
        this.unidadService.getAll().then(data=>{
            this.setState({unidad:data});
            console.log("aqui estoy guardando la lista unidad");
            
        });
        this.solicitudService.getAll().then(data=>{
            this.setState({solicitud:data})
            console.log("aqui estoy guardando la lista solicitud");
            var results = {};
            data.map((elemento)=>{
            if(results[elemento.requerimiento.actividad.id_actividad] == null){
                var json = {}
                json['actividad'] = elemento.requerimiento.actividad.descripcion_acti
                json['presupuesto'] = elemento.requerimiento.valorPresupuesto
                json['unidad'] = elemento.unidad.siglas
                json['solicitud'] = 1
                json['montoReferencial'] = elemento.montoRef
                results[elemento.requerimiento.actividad.id_actividad] = json;
            }else{
                results[elemento.requerimiento.actividad.id_actividad]['solicitud'] += 1;
                results[elemento.requerimiento.actividad.id_actividad]['montoReferencial'] += elemento.montoRef;
            }})
            this.setState(({
                listaActividad:results
            }));
            console.log(results);

        
        }); 
        
    };

    componentDidMount() {
        this.getActividades();
    }

    render() {   
        return (
            <Container style={{background: 'white', padding:'1%'}}>
                <Table striped bordered hover>
                <Col>
                    
                    <thead className='fila-titulo' style={{ height: 50}}>                        
                        <th>ActividadPoa</th>
                        <th>Presupuesto Asignado</th>
                        <th>Unidad Requerimiento</th>
                        <th>Solicitud Asignada</th>
                        <th>Solicitudes Cuantificados monto referencial</th>
                        <th>Porcentaje</th>
                        <th>Detalles</th>
                        
                    
                    </thead>
                    <tbody>
                        {Object.values(this.state.listaActividad).map((elemento)=>(    
                            <tr>
                                <td>{elemento.actividad}</td>
                                <td>{elemento.presupuesto}</td>
                                <td>{elemento.unidad}</td>
                                <td>{elemento.solicitud}</td>
                                <td>{elemento.montoReferencial}</td>
                                <td>{(parseInt(elemento.montoReferencial)*100)/elemento.presupuesto+ "%"}</td>
                                <td><Button variant="link"><FcViewDetails size={32}/></Button></td>
                            </tr>
                            
                        ))}
                    </tbody>
                    </Col>
                </Table>
            </Container>
        )
    };

   
}
