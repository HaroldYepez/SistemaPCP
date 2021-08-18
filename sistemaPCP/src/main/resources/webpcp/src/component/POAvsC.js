import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
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
import {CertificacionService} from "../services/CertificacionService";
import {Solicitud_TramiteService} from "../services/Solicitud_TramiteService";
import {Solicitud_CertificacionService} from "../services/Solicitud_CertificacionService";
import { TramiteService } from "../services/TramiteService";
import { UnidadService } from "../services/UnidadService";
import { ActividadService } from "../services/ActividadService";
import { SolicitudService } from "../services/SolicitudService";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import {Bar} from "react-chartjs-2";



export default class POAvsCPrueba extends Component {
    constructor() {
        super();
        this.state = {
          tramite: [],
          certificacion: [],
          actividad: [],
          unidad: [],
          solicitud: [],
          requerimeinto: [],
          listaCertificaciones: [],
          modalActualizar: false,
          numSolicitudes:{},
          selActividad:"",
          filtro: false,
          filtroValue: "",
          datos: {},
          modalGrafico: false,
          listaUnidad: [],
        };
        this.tramiteService = new TramiteService();
        this.actividadService = new ActividadService();
        this.unidadService = new UnidadService();
        this.solicitudService = new SolicitudService();
        this.requerimientoSevice = new RequerimientoService();
        this.certificacionService=new CertificacionService();
        this.solicitud_tramiteService= new Solicitud_TramiteService();
        this.solicitud_certificacionService= new Solicitud_CertificacionService();
     
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

      cerrarModalGrafico = () => {
        this.setState({ modalGrafico: false });
      };

      getCertificaciones = () => {
        this.solicitud_certificacionService.getAll().then((data3) => {
          this.certificacionService.getAll().then((data) => {
            this.solicitudService.getAll().then((data2) => {
              //certificacion
              var temp = {};
              data.map((elemento) =>{
                var cert = {};
                cert["noCertificacion"] = elemento.noCertificacion;
                cert["montoRef"] = elemento.total;
                temp[elemento.oid] = cert;  
              });
                //solicitud
              var temp2 = {};
              data2.map((elemento2) =>{
                var soli = {};
                soli["numSolicitud"] = elemento2.numSolicitud;
                soli["montoRef"] = elemento2.montoRef;
                soli["unidad"] = elemento2.unidad;
                soli["requerimiento"] = elemento2.requerimiento;
                temp2[elemento2.numSolicitud] = soli;  
              });
              this.setState({certificacion: temp});
              this.setState({solicitud: temp2});
              
              var results = {};
              var paraGrafica = {};
              var act = {};
              
              data3.map((elemento3) => {
                var requerimiento = this.state.solicitud[elemento3.solicitud_num_solicitud]["requerimiento"];
                var unidad = this.state.solicitud[elemento3.solicitud_num_solicitud]["unidad"];
                var certificacion = this.state.certificacion[elemento3.certificacion_oid]
                if (certificacion["no_certificacion"] != null && requerimiento != null){

                  if( results[requerimiento.actividad.id_actividad] == null){
                    var json = {};
                    act[requerimiento.actividad.id_actividad]=[{"cosSolicitud":certificacion["no_certificacion"],"Total":certificacion["montoRef"]}];
                    json["actividad"] = requerimiento.actividad.descripcion_acti;
                    json["presupuesto"] = requerimiento.actividad.precTotal;
                    json["unidad"] = unidad.siglas;
                    json["solicitud"] = 1;
                    json["solicitudMonto"] = certificacion["montoRef"];
                    results[requerimiento.actividad.id_actividad] = json;
                  }else{
                    results[requerimiento.actividad.id_actividad]["solicitud"] += 1;
                    results[requerimiento.actividad.id_actividad]["solicitudMonto"] += certificacion["montoRef"];
                  }
                  if (paraGrafica[unidad.id_unidad] == null) {
                    var temp = {};
                    temp["presupuesto"] = requerimiento.actividad.precTotal;
                    temp["montoReferencial"] = certificacion["montoRef"];
                    temp["siglas"]= unidad.siglas
                    paraGrafica[unidad.id_unidad] = temp;
                  } else {
                    paraGrafica[unidad.id_unidad]["montoReferencial"] += certificacion["montoRef"];
                    paraGrafica[unidad.id_unidad]["presupuesto"] += requerimiento.actividad.precTotal;
                  }
                  
                }      
              });
              
              this.setState({
                listaCertificaciones: results,
                numSolicitudes: act,
                listaUnidad: paraGrafica,
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
      filtroDatos = (Value) => {
        if (Value == ""){
          this.setState({
            filtro: false,
        });
        }else{
        this.setState({
        filtro: true,
        filtroValue: Value},
        );}
      }

      llenarDatos() {
        var labels= [];
        var datasets= [];
        var dataPresu= {};
        var datosPresu=[];
        var dataMonto= {};
        var datosMonto=[];
        var dataSaldo= {};
        var datosSaldo=[];
        var datosgraf={};
        Object.values(this.state.listaUnidad).map(
          (elemento) => (
            labels.push(elemento.siglas),
            datosPresu.push(elemento.presupuesto),
            datosMonto.push(elemento.montoReferencial),
            datosSaldo.push(elemento.presupuesto - elemento.montoReferencial)
          ));
    
        dataPresu["data"] = datosPresu;
        dataPresu["label"] = "Presupuesto";
        dataPresu["backgroundColor"] = "#0164A1";
    
        dataMonto["data"] = datosMonto;
        dataMonto["label"]= "Monto Cotización Referencial";
        dataMonto["backgroundColor"]= "#011D42";
    
        dataSaldo["data"] = datosSaldo;
        dataSaldo["label"]= "Saldo";
        dataSaldo["backgroundColor"]= "#F8B82B";
    
        datasets.push(dataPresu, dataMonto, dataSaldo);
        datosgraf["labels"] = labels;
        datosgraf["datasets"] = datasets; 
        this.setState({
          datos: datosgraf,
          modalGrafico: true,
        });
      }
    
      render() {
        return (
          <>
          <Container style={{ background: "white", padding: "1%", marginLeft: "15%" }}>
          <Row>
            <Col style={{ maxWidth: "150px", padding: "0%", paddingLeft: "1%"}}>
              <InputGroup className="mb-3"  size="sm" style={{ maxWidth: "300px", fontSizeAdjust: "12px" }}>
                <FormControl
                  type="text"
                  placeholder="Buscar Unidad"
                  aria-label="Buscar"
                  aria-describedby="basic-addon1"
                  
                  onKeyPress={event => {
                    if (event.key === "Enter") {
                      this.filtroDatos(event.target.value);
                    }
                  }}
                  
                />
              </InputGroup>
            </Col>
            <Col style={{ maxWidth: "150px", padding: "0%", marginLeft: "59%"}}>
              <Button style={{ background:"#011d42"}} variant="secondary" onClick={() => this.llenarDatos()}>Gráfica</Button>
            </Col>
          </Row>
          <Table striped bordered hover id="table-to-xls" width="10px" table-layout="fixed">
            <Col>
              <thead className="fila-titulo" style={{ height: 50, borderColor: "#011d42" }}>
                <th>ActividadPoa</th>
                <th>Presupuesto Asignado</th>
                <th>Unidad Requerimiento</th>
                <th>Solicitud Asignada</th>
                <th word-wrap="break-word">Solicitudes Cuantificadas<br/>Monto Referencial</th>
                <th>Porcentaje</th>
                <th>Detalles</th>
              </thead>
              <tbody>
                {this.state.filtro == true ? (
                Object.values(this.state.listaCertificaciones).map((elemento,index) => (
                  elemento.unidad == this.state.filtroValue ? (
                  <tr>
                    <td>{elemento.actividad}</td>
                    <td>${elemento.presupuesto}</td>
                    <td>{elemento.unidad}</td>
                    <td>{elemento.solicitud}</td>
                    <td>${elemento.solicitudMonto}</td>
                    <td>
                      {((parseInt(elemento.solicitudMonto) * 100) /
                        elemento.presupuesto).toFixed(2) +
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
                  ):(
                    <tr>
                    
                  </tr>
                  ))
                )):(
                  Object.values(this.state.listaCertificaciones).map((elemento,index) => (
                    <tr>
                      <td>{elemento.actividad}</td>
                      <td>${elemento.presupuesto}</td>
                      <td>{elemento.unidad}</td>
                      <td>{elemento.solicitud}</td>
                      <td>${elemento.solicitudMonto}</td>
                      <td>
                        {((parseInt(elemento.solicitudMonto) * 100) /
                          elemento.presupuesto).toFixed(2) +
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
                  )
                ))}
              </tbody>
              
            </Col>
          </Table>
          <Row >
          <Col style={{ maxWidth: "150px", padding: "0%", paddingLeft: "1%"}}>
          <div align="left" >
                <ReactHTMLTableToExcel
                  id="botonExportar"
                  className="btn btn-success"
                  table="table-to-xls"
                  filename="POAvsCertificado"
                  sheet="Pagina1"
                  buttonText="Descargar Excel"
                ></ReactHTMLTableToExcel>
              </div>
          </Col>
          <Col style={{ maxWidth: "150px", padding: "0%"}}>
          <Button variant="secondary" align="left">Descargar PDF</Button>
          </Col>
          </Row>
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
                  <td>${elemento.Total}</td>
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
        <Modal show={this.state.modalGrafico}>
          <ModalHeader>
            <ModalTitle>Poa Vs Certificación</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <Row>
              <Bar data={this.state.datos}/>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="secondary"
              onClick={() => this.cerrarModalGrafico()}
            >
              Close
            </Button>
          </ModalFooter>
        </Modal>   
          </>
        );
      }
 
}
