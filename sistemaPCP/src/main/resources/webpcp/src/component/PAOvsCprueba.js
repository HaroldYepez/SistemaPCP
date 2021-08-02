import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { TramiteService } from "../services/TramiteService";
import { UnidadService } from "../services//UnidadService";
import { ActividadService } from "../services/ActividadService";
import { SolicitudService } from "../services/SolicitudService";
import { Col } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import { closeButton } from "react-bootstrap";
import ModalTitle from "react-bootstrap/ModalTitle";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalHeader from "react-bootstrap/ModalHeader";
import { FcViewDetails } from "react-icons/fc";
import Button from "react-bootstrap/Button";
import "./estilos.css";
import { RequerimientoService } from "../services/RequerimientoService";
import{CertificacionService} from "../services/CertificacionService";
export default class POAvsCPrueba extends Component {
    constructor() {
        super();
        this.state = {
          tramite: [],
          actividad: [],
          unidad: [],
          solicitud: [],
          requerimeinto: [],
          listaCertificaciones: [],
          modalActualizar: false,
          numSolicitudes:{},
          selActividad:"",
        };
        this.tramiteService = new TramiteService();
        this.actividadService = new ActividadService();
        this.unidadService = new UnidadService();
        this.solicitudService = new SolicitudService();
        this.requerimientoSevice = new RequerimientoService();
        this.certificacionService=new CertificacionService();
     
      }
      mostrarModalActualizar = (idActividad) => {
        this.setState({
          selActividad: idActividad,
          modalActualizar: true,
        });
        console.log("este dato pase aqui"+this.state.selActividad);
      };
      cerrarModalActualizar = () => {
        this.setState({ modalActualizar: false });
      };
      getCertificaciones = () => {
        this.certificacionService.getAll().then((data) => {
          this.solicitudService.getAll().then((data2) => {
            var results = {};
            var act = {};
            data.map((elemento1) => {
                data2.map((elemento2) => {
                  if (elemento2.tramite.numTramite == elemento1.tramite.numTramite) {
                    if (
                      results[elemento2.requerimiento.actividad.id_actividad] == null
                    ) {
                      var json = {};
                      act[elemento2.requerimiento.actividad.id_actividad]=[{"cosSolicitud":elemento1.noCertificacion,"Total":elemento1.total}];
                      json["actividad"] = elemento2.requerimiento.actividad.descripcion_acti;
                      json["presupuesto"] = elemento2.requerimiento.valorPresupuesto;
                      json["unidad"] = elemento2.unidad.siglas;
                      json["solicitud"] = 1;
                      json["solicitudMonto"] = elemento1.total;
                      results[elemento2.requerimiento.actividad.id_actividad] = json;
                    }else {
                        act[elemento2.requerimiento.actividad.id_actividad].push({"cosSolicitud":elemento1.noCertificacion,"Total":elemento1.total})
                        results[elemento2.requerimiento.actividad.id_actividad][
                            "solicitud"
                          ] += 1;
                        results[elemento2.requerimiento.actividad.id_actividad][
                            "solicitudMonto"
                          ] += elemento1.total;
                        results[elemento2.requerimiento.actividad.id_actividad][
                            "presupuesto"
                          ] +=elemento2.requerimiento.valorPresupuesto;
                    }
                  }
                });
                this.setState({
                    listaCertificaciones: results,
                    numSolicitudes: act
                  });
                  console.log(results);
                  console.log(this.state.numSolicitudes)
              });
           
          });
        });

      };
    
      componentDidMount() {
        this.getCertificaciones();
      }
    
      render() {
        return (
          <>
          <Container style={{ background: "white", padding: "1%" }}>
          <Table striped bordered hover>
            <Col>
              <thead className="fila-titulo" style={{ height: 50 }}>
                <th>ActividadPoa</th>
                <th>Presupuesto Asignado</th>
                <th>Unidad Requerimiento</th>
                <th>Solicitud Asignada</th>
                <th>Solicitudes Cuantificadas Monto Referencial</th>
                <th>Porcentaje</th>
                <th>Detalles</th>
              </thead>
              <tbody>
                {Object.values(this.state.listaCertificaciones).map((elemento,index) => (
                  <tr>
                    <td>{elemento.actividad}</td>
                    <td>{elemento.presupuesto}</td>
                    <td>{elemento.unidad}</td>
                    <td>{elemento.solicitud}</td>
                    <td>{elemento.solicitudMonto}</td>
                    <td>
                      {(parseInt(elemento.solicitudMonto) * 100) /
                        elemento.presupuesto +
                        "%"}
                    </td>
                    <td>
                      <Button
                        variant="link"
                        onClick={() => this.mostrarModalActualizar(index)}
                      >
                        <FcViewDetails size={32} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
              
            </Col>
          </Table>
        </Container>
        <Modal show={this.state.modalActualizar}>
          <ModalHeader
            closeButton
            onClick={() => this.cerrarModalActualizar()}
          >
            <ModalTitle>Detalle Solicitud</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <Table striped bordered hover>
            <thead className="fila-titulo" style={{ height: 50 }}>
            <th>Codigo Certificacion</th>
            <th>Monto Cotizacion Referencial</th>
            </thead>
            <tbody>
            {parseInt(this.state.selActividad) >= 0?
              Object.values(this.state.numSolicitudes)[this.state.selActividad].map((elemento) => (
                <tr>
                  <td>{elemento.cosSolicitud}</td>
                  <td>{elemento.Total}</td>
                </tr>
              ))
              :
              <tr>
                <td>No</td>
                <td>Data</td>
              </tr>
              }
            </tbody>
           

            </Table>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="secondary"
              onClick={() => this.cerrarModalActualizar()}
            >
              Close
            </Button>
          </ModalFooter>
        </Modal>
           
          </>
        );
      }
 
}
