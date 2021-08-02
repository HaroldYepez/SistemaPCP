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

export default class POAvsSPrueba extends Component {
  constructor() {
    super();
    this.state = {
      tramite: [],
      actividad: [],
      unidad: [],
      solicitud: [],
      requerimeinto: [],
      listaActividad: [],
      modalActualizar: false,
      numSolicitudes:{},
      selActividad:"",
    };
    this.tramiteService = new TramiteService();
    this.actividadService = new ActividadService();
    this.unidadService = new UnidadService();
    this.solicitudService = new SolicitudService();
    this.requerimientoSevice = new RequerimientoService();
  }

  // mostrarModalActualizar = (id_Actividad) => {
  //   this.setState((id_Actividad) => ({
  //     selActividad: this.id_Actividad
  //   }));
  //   this.setState({ modalActualizar: true });
    
  // };
  mostrarModalActualizar = (idActividad) => {
    this.setState({
      selActividad: idActividad,
      modalActualizar: true,
    });
    //  this.setState((idActividad) => ({
    //   selActividad: idActividad
    // }));
    console.log("este dato pase aqui"+this.state.selActividad);
  };
  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };
  getDetalleSolicitud = () => {
    // console.log(Object.values(this.state.listaActividad.id_actividad))
    // this.solicitud.map((elemento) => (


    // ))
  };

  getActividades = () => {
    this.unidadService.getAll().then((data) => {
      this.setState({ unidad: data });
      console.log("aqui estoy guardando la lista unidad");
    });
    this.solicitudService.getAll().then((data) => {
      this.setState({ solicitud: data });
      console.log("aqui estoy guardando la lista solicitud");
      var results = {};
      var act = {}
      data.map((elemento) => {
        if (results[elemento.requerimiento.actividad.id_actividad] == null) {
          var json = {};
          act[elemento.requerimiento.actividad.id_actividad]=[{"cosSolicitud":elemento.numSolicitud,"Total":elemento.montoRef}];
          //this.state.numSolicitudes[elemento.requerimiento.actividad.id_actividad]=[{"cosSolicitud":elemento.numSolicitud,"Total":elemento.montoRef}];
          json["actividad"] = elemento.requerimiento.actividad.descripcion_acti;
          json["presupuesto"] = elemento.requerimiento.valorPresupuesto;
          json["unidad"] = elemento.unidad.siglas;
          json["solicitud"] = 1;
          json["montoReferencial"] = elemento.montoRef;
          results[elemento.requerimiento.actividad.id_actividad] = json;
        } else {
          act[elemento.requerimiento.actividad.id_actividad].push({"cosSolicitud":elemento.numSolicitud,"Total":elemento.montoRef})
          //this.state.numSolicitudes[elemento.requerimiento.actividad.id_actividad].push({"cosSolicitud":elemento.numSolicitud,"Total":elemento.montoRef})
          console.log(elemento.numSolicitud)
          results[elemento.requerimiento.actividad.id_actividad][
            "solicitud"
          ] += 1;
          results[elemento.requerimiento.actividad.id_actividad][
            "montoReferencial"
          ] += elemento.montoRef;
          results[elemento.requerimiento.actividad.id_actividad][
            "presupuesto"
          ] += elemento.requerimiento.valorPresupuesto;
        }
        
      });
      this.setState({
        listaActividad: results,
        numSolicitudes: act
      });
      console.log(results);
      console.log(this.state.numSolicitudes)
    });
  };

  componentDidMount() {
    this.getActividades();
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
                <th>Solicitudes Cuantificados monto referencial</th>
                <th>Porcentaje</th>
                <th>Detalles</th>
              </thead>
              <tbody>
                {Object.values(this.state.listaActividad).map((elemento,index) => (
                  <tr>
                    <td>{elemento.actividad}</td>
                    <td>{elemento.presupuesto}</td>
                    <td>{elemento.unidad}</td>
                    <td>{elemento.solicitud}</td>
                    <td>{elemento.montoReferencial}</td>
                    <td>
                      {(parseInt(elemento.montoReferencial) * 100) /
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
            <th>Codigo Solicitud</th>
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
