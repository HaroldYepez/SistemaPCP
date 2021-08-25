import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { TramiteService } from "../services/TramiteService";
import { UnidadService } from "../services/UnidadService";
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
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import {Bar} from "react-chartjs-2";


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
      numSolicitudes: {},
      selActividad: "",
      filtro: false,
      filtroValue: "",
      datos: {},
      modalGrafico: false,
      listaUnidad: [],
      selUnidad: "",
      
      
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
  mostrarModalActualizar = (elemento) => {
    this.setState({
      selActividad: elemento.id_actividad,
      selUnidad: elemento.unidad,
      modalActualizar: true,
    });
    //  this.setState((idActividad) => ({
    //   selActividad: idActividad
    // }));
    
  };
  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  cerrarModalGrafico = () => {
    this.setState({ modalGrafico: false });
  };
  getDetalleSolicitud = () => {
    // console.log(Object.values(this.state.listaActividad.id_actividad))
    // this.solicitud.map((elemento) => (
    // ))
  };

  getActividades = () => {
    this.unidadService.getAll().then((data) => {
      this.setState({ unidad: data });
      
    });
    this.solicitudService.getAll().then((data) => {
      this.setState({ solicitud: data });
      console.log("aqui estoy guardando la lista solicitud");
      var results = {};
      var paraGrafica = {};
      var act = {};
      var indice = 0;
      var indice2 = 0;
      var flag = false;
      data.map((elemento) => {
        var temp = elemento.requerimiento;
        
		    if(temp != null){
          var id_acti = elemento.requerimiento.actividad.id_actividad;
          
          Object.values(results).map((elem) =>{
            if(elem != null){
            if (elem["id_actividad"] == id_acti && elem["unidad"] == elemento.unidad.siglas) {
              
              var solici = {};
              solici["id_actividad"] = elemento.requerimiento.actividad.id_actividad;
              solici["numSolicitud"] = elemento.numSolicitud;
              if(elemento.montoRef == null){
                solici["monto"] = 0;
              }else{
                solici["monto"] = elemento.montoRef;
              }
              solici["unidad"] = elemento.unidad.siglas;
              act[indice2] = solici;
              indice2+=1;
              elem["solicitud"] += 1;
              elem["montoReferencial"] += elemento.montoRef;
              flag = true;
            }
            }
          });
          if (flag == false){
            console.log(id_acti);
            var json = {};
            var solici = {};
            solici["id_actividad"] = elemento.requerimiento.actividad.id_actividad;
            solici["numSolicitud"] = elemento.numSolicitud;
            
            solici["unidad"] = elemento.unidad.siglas;
            
            json["id_actividad"] = elemento.requerimiento.actividad.id_actividad;
            json["actividad"] = elemento.requerimiento.actividad.descripcion_acti;
            json["presupuesto"] = elemento.requerimiento.actividad.precTotal;
            json["unidad"] = elemento.unidad.siglas;
            json["solicitud"] = 1;
            if(elemento.montoRef == null){
              json["montoReferencial"] = 0;
              solici["monto"] = 0;
            }else{
              json["montoReferencial"] = elemento.montoRef;
              solici["monto"] = elemento.montoRef;
            }
            act[indice2] = solici;
            results[indice] = json;
            indice += 1;
            indice2 += 1;
          }
          flag = false;
          if (paraGrafica[elemento.unidad.id_unidad] == null) {
            var temp2 = {};
            var actividades = {};
            actividades[elemento.requerimiento.actividad.id_actividad] = elemento.requerimiento.actividad.precTotal;
            temp2["actividades"] = actividades;
            temp2["presupuesto"] = elemento.requerimiento.actividad.precTotal;
            temp2["montoReferencial"] = elemento.montoRef;
            temp2["siglas"]= elemento.unidad.siglas
            paraGrafica[elemento.unidad.id_unidad] = temp2;
          } else {
            if (paraGrafica[elemento.unidad.id_unidad]["actividades"][elemento.requerimiento.actividad.id_actividad] != null){
              paraGrafica[elemento.unidad.id_unidad]["montoReferencial"] += elemento.montoRef;
            }else{
              paraGrafica[elemento.unidad.id_unidad]["montoReferencial"] += elemento.montoRef;
              paraGrafica[elemento.unidad.id_unidad]["presupuesto"] +=elemento.requerimiento.actividad.precTotal;
          
            }
          }
        }
        
      });
      this.setState({
        listaActividad: results,
        numSolicitudes: act,
        listaUnidad: paraGrafica,
      });
      console.log(results);
      console.log(this.state.numSolicitudes);
    });
  };

  componentDidMount() {
    this.getActividades();
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
        <Container style={{ background: "white", padding: "1%", textAlign: "center" }}>
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
          
          <Table striped bordered hover id="table-to-xls" >
            <Col>
              <thead className="fila-titulo" style={{ height: 50, fontWeight: "lighter", borderColor: "#011d42"}}>
                <th width="20%">ActividadPoa</th>
                <th>Presupuesto Asignado</th>
                <th>Unidad Requerimiento</th>
                <th>Solicitud Asignada</th>
                <th>Monto Cotización Referencial</th>
                <th>Porcentaje</th>
                <th>Detalles</th>
              </thead>
              <tbody>
                {this.state.filtro == true ? (
                  
                Object.values(this.state.listaActividad).map(
                  (elemento, index) => (
                    
                    elemento.unidad == this.state.filtroValue ? (
                    <tr>
                      <td>{elemento.actividad}</td>
                      <td>${elemento.presupuesto}</td>
                      <td>{elemento.unidad}</td>
                      <td>{elemento.solicitud}</td>
                      <td>${elemento.montoReferencial}</td>
                      <td>
                        {(
                          (parseInt(elemento.montoReferencial) * 100) /
                          elemento.presupuesto
                        ).toFixed(2) + "%"}
                      </td>
                      <td>
                        <Button
                          variant="link"
                          onClick={() => this.mostrarModalActualizar(elemento)}
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
                  Object.values(this.state.listaActividad).map(
                    (elemento, index) => (
                      <tr>
                        <td>{elemento.actividad}</td>
                        <td>${elemento.presupuesto}</td>
                        <td>{elemento.unidad}</td>
                        <td>{elemento.solicitud}</td>
                        <td>${elemento.montoReferencial}</td>
                        <td>
                          {(
                            (parseInt(elemento.montoReferencial) * 100) /
                            elemento.presupuesto
                          ).toFixed(2) + "%"}
                        </td>
                        <td>
                          <Button
                            variant="link"
                            onClick={() => this.mostrarModalActualizar(elemento)}
                          >
                            <FcViewDetails size={32} />
                          </Button>
                        </td>
                      </tr>
                   )
                  )
                )}
              </tbody>
            </Col>
          </Table>
          <Row>
            <Col style={{ maxWidth: "150px", padding: "0%", paddingLeft: "1%"}}>
              <div align="left">
                <ReactHTMLTableToExcel
                  id="botonExportar"
                  className="btn btn-success"
                  table="table-to-xls"
                  filename="POAvsSolicitud"
                  sheet="Pagina1"
                  buttonText="Descargar Excel"
                ></ReactHTMLTableToExcel>
              </div>
            </Col>
            
          </Row>
        </Container>
        <Modal show={this.state.modalActualizar}>
          <ModalHeader>
            <ModalTitle>Detalle Solicitud</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <Table striped bordered hover>
              <thead className="fila-titulo" style={{ height: 50 }}>
                <th>Codigo Solicitud</th>
                <th>Monto Cotizacion Referencial</th>
              </thead>
              <tbody>
                {parseInt(this.state.selActividad) >= 0 ? (
                  Object.values(this.state.numSolicitudes).map((elemento) => (
                    elemento.id_actividad == parseInt(this.state.selActividad) & elemento.unidad == this.state.selUnidad ? (
                    <tr>
                      <td>{elemento.numSolicitud}</td>
                      <td>${elemento.monto}</td>
                    </tr>
                    ):(
                      <tr></tr>
                    )
                    
                  ))
                ) : (
                  <tr>
                    <td>No</td>
                    <td>Data</td>
                  </tr>
                )}
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
        <Modal show={this.state.modalGrafico} fullscreen='true' dialogClassName="modal-90w" size='xl'>
          <ModalHeader>
            <ModalTitle>Poa Vs Solicitud</ModalTitle>
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
