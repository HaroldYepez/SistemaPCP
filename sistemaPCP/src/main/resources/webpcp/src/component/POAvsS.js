import React from 'react';
import {Container, Modal, ModalBody} from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Table from 'react-bootstrap/Table'
import {FcViewDetails} from 'react-icons/fc';
import Button from 'react-bootstrap/Button'
import './estilos.css'
import ModalHeader from 'react-bootstrap/esm/ModalHeader';

class POAvsS extends React.Component{

    dataArray = [{"actividad":"descripción", 
                     "presupuesto":"3000", 
                     "unidad":"FIEC", 
                     "solicitudes":"3", 
                     "monto":"3000", 
                     "porcentaje":"60"},
                     {"actividad":"descripción2", 
                     "presupuesto":"5000", 
                     "unidad":"FADCOM", 
                     "solicitudes":"8", 
                     "monto":"5000", 
                     "porcentaje":"50"},
                     {"actividad":"descripción3", 
                     "presupuesto":"6000", 
                     "unidad":"FCNM", 
                     "solicitudes":"4", 
                     "monto":"3000", 
                     "porcentaje":"40"}
                    ];

        renderData(data, index) {
            return (
                <tr key={index}>
                    <td>{data.actividad}</td>
                    <td>{data.presupuesto}</td>
                    <td>{data.unidad}</td>
                    <td>{data.solicitudes}</td>
                    <td>{data.monto}</td>
                    <td>{data.porcentaje}</td>
                    
                    <td><Button variant="link"><FcViewDetails size={32}/></Button></td>
                </tr>
            )
    };

    render(){

        

        return(
            <>
            <Container style={{background: 'white', padding:'1%'}}>
                <Col>
                    <Row style={{ marginLeft: 200, marginRight: 0}}>
                        <InputGroup className="mb-3">
                            <FormControl style={{ height: 30, maxWidth: 200, fontSize: 12 }}
                                placeholder="Buscar"
                                aria-label="Buscar"
                                aria-describedby="basic-addon1"
                            />
                        </InputGroup>
                    </Row>
                    <Row style={{ marginLeft: 200, marginRight:200}}>
                        <Table striped bordered hover size="sm" style={{ fontSize: 12}}>
                            <thead className='fila-titulo' style={{ height: 50}}>
                            <tr>
                                <th>Actividad POA</th>
                                <th>Presupuesto Asignado</th>
                                <th>Unidad Requirente</th>
                                <th>Solicitudes Asignadas</th>
                                <th>Monto Cotización Referencial</th>
                                <th>Porcentaje Solicitado</th>
                                <th>Detalles</th>
                            </tr>
                            </thead>
                            <tbody>
                                    {this.dataArray.map(this.renderData)}           
                            </tbody>
                        </Table>
                    </Row>
                </Col>
            </Container>
            <Modal>
                <ModalHeader>
                <div><h3>Detalle Solicitudes</h3></div>
                </ModalHeader>
                <ModalBody>

                </ModalBody>


            </Modal>
            
            </>  
        );
      
   
    }
}

export default POAvsS;