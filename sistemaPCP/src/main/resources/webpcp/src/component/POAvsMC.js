import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { TramiteService } from "../services/TramiteService";
import { UnidadService } from "../services/UnidadService";
import { ActividadService } from "../services/ActividadService";
import { SolicitudService } from "../services/SolicitudService";
import {Solicitud_TramiteService} from "../services/Solicitud_TramiteService";
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

export default class POAvsMCPrueba extends Component {
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
    this.solicitud_tramiteService= new Solicitud_TramiteService();
  }
  mostrarModalActualizar = (elemento) => {
    this.setState({
      selActividad: elemento.id_actividad,
      selUnidad: elemento.unidad,
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

  
  getMontoContractual = () => {
    this.solicitud_tramiteService.getAll().then((data3) => {
      this.tramiteService.getAll().then((data) =>{  
        this.solicitudService.getAll().then((data2) => {
          
          var temp2 = {};
          data2.map((elemento2) =>{
            //console.log(elemento2.numSolicitud)
            var soli = {};
            soli["numSolicitud"] = elemento2.numSolicitud;
            soli["montoRef"] = elemento2.montoRef;
            soli["unidad"] = elemento2.unidad;
            soli["requerimiento"] = elemento2.requerimiento;
            temp2[elemento2.numSolicitud] = soli;  
          });
          this.setState({solicitud: temp2});
          //console.log(temp2)
          //console.log(this.state.solicitud)
        
          var temp = {};
          data.map((elementos) =>{
            //console.log(elemento.numTramite)
            //console.log(elemento.montoContractual)
            var tram = {};
            tram["numTramite"] = elementos.numTramite;
            tram["montoContractual"] = elementos.montoContractual;
            temp[elementos.numTramite]= tram;
          });
          this.setState({tramite: temp});
          //console.log(temp)
          //console.log(this.state.tramite)
      
          var results = {};
          var paraGrafica = {};
          var act = {};
          var indice = 0;
          var indice2 = 0;
          var flag = false;
          data3.map((elemento) => {
            console.log(elemento)
            if(elemento != null){
            var requerimiento = this.state.solicitud[elemento.solicitud_num_solicitud]["requerimiento"];
            var unidad = this.state.solicitud[elemento.solicitud_num_solicitud]["unidad"];
            var tramite = this.state.tramite[elemento.tramite_num_tramite];
            
            if(requerimiento != null && elemento.tramite_num_tramite != null){
              var id_acti = requerimiento.actividad.id_actividad;
              Object.values(results).map((elem) =>{
                if(elem != null){
                  if (elem["id_actividad"] == id_acti && elem["unidad"] == unidad.siglas) {

                    var solici = {};
                    solici["id_actividad"] = requerimiento.actividad.id_actividad;
                    solici["numSolicitud"] = elemento.solicitud_num_solicitud;
                    solici["numTramite"] = elemento.tramite_num_tramite;
                    if(tramite["montoContractual"] == null){
                      solici["monto"] = 0;
                    }else{
                      solici["monto"] = tramite["montoContractual"];
                    }
                    solici["unidad"] = unidad.siglas;
                    act[indice2] = solici;
                    indice2+=1;
                    elem["solicitud"] += 1;
                    if(elem["montoReferencial"] < tramite["montoContractual"]){
                      elem["montoReferencial"] = tramite["montoContractual"];
                    }
                    //elem["montoReferencial"] += tramite["montoContractual"];
                    flag = true;

                  }

                }
              });
              if (flag == false){
                var json = {};
                var solici = {};
                solici["id_actividad"] = requerimiento.actividad.id_actividad;
                solici["numSolicitud"] = elemento.solicitud_num_solicitud;
                solici["numTramite"] = elemento.tramite_num_tramite;
                solici["unidad"] = unidad.siglas;
                
                json["id_actividad"] = requerimiento.actividad.id_actividad;
                json["actividad"] = requerimiento.actividad.descripcion_acti;
                json["presupuesto"] = requerimiento.actividad.precTotal;
                json["unidad"] = unidad.siglas;
                json["solicitud"] = 1;
                if(tramite["montoContractual"] == null){
                  json["montoReferencial"] = 0;
                  solici["monto"] = 0;
                }else{
                  json["montoReferencial"] = tramite["montoContractual"];
                  solici["monto"] = tramite["montoContractual"];
                }
                act[indice2] = solici;
                results[indice] = json;
                indice += 1;
                indice2 += 1;
              }
              flag = false;
              if (paraGrafica[unidad.id_unidad] == null) {
                var temp2 = {};
                var actividades = {};
                actividades[requerimiento.actividad.id_actividad] = requerimiento.actividad.precTotal;
                temp2["actividades"] = actividades;
                temp2["presupuesto"] = requerimiento.actividad.precTotal;
                temp2["montoReferencial"] = tramite["montoContractual"];
                temp2["siglas"]= unidad.siglas
                paraGrafica[unidad.id_unidad] = temp2;
              } else {
                if (paraGrafica[unidad.id_unidad]["actividades"][requerimiento.actividad.id_actividad] != null){
                  if(paraGrafica[unidad.id_unidad]["montoReferencial"] < tramite["montoContractual"]){
                    paraGrafica[unidad.id_unidad]["montoReferencial"] = tramite["montoContractual"];
                  }
                  //paraGrafica[unidad.id_unidad]["montoReferencial"] += tramite["montoContractual"];
                }else{
                  if(paraGrafica[unidad.id_unidad]["montoReferencial"] < tramite["montoContractual"]){
                    paraGrafica[unidad.id_unidad]["montoReferencial"] = tramite["montoContractual"];
                  }
                  paraGrafica[unidad.id_unidad]["presupuesto"] +=requerimiento.actividad.precTotal;
              
                }
              }
              /*
            console.log(this.state.solicitud[elemento.solicitud_num_solicitud]["numSolicitud"])
            if (results[requerimiento.actividad.id_actividad] == null) {
              var json = {};
              act[requerimiento.actividad.id_actividad]=[{"cosSolicitud":elemento.solicitud_num_solicitud,"Total":this.state.tramite[elemento.tramite_num_tramite]["montoContractual"]}];
              json["actividad"] = requerimiento.actividad.descripcion_acti;
              json["presupuesto"] = requerimiento.actividad.precTotal;
              json["unidad"] = this.state.solicitud[elemento.solicitud_num_solicitud]["unidad"].siglas;
              json["solicitud"] = 1;
              if (this.state.tramite[elemento.tramite_num_tramite]["montoContractual"] == null) {
                json["montoContractual"] = 0;
              }else{
                json["montoContractual"] = this.state.tramite[elemento.tramite_num_tramite]["montoContractual"];
              }
              results[requerimiento.actividad.id_actividad] = json;
            } else {
              if(act[requerimiento.actividad.id_actividad]["cosSolicitud"] != elemento.solicitud_num_Solicitud){
                act[requerimiento.actividad.id_actividad].push({"cosSolicitud":elemento.solicitud_num_Solicitud,"Total":this.state.tramite[elemento.tramite_num_tramite]["montoContractual"]})
                results[requerimiento.actividad.id_actividad]["solicitud"] += 1;
                results[requerimiento.actividad.id_actividad]["montoContractual"] += this.state.tramite[elemento.tramite_num_tramite]["montoContractual"]; 
              }
            }
            if (paraGrafica[unidad.id_unidad] == null) {
              var temp2 = {};
              temp2["presupuesto"] = requerimiento.actividad.precTotal;;
              temp2["montoReferencial"] = tramite["montoContractual"];
              temp2["siglas"]= unidad.siglas
              paraGrafica[unidad.id_unidad] = temp2;
            } else {
              if(act[requerimiento.actividad.id_actividad]["cosSolicitud"] != elemento.solicitud_num_Solicitud){
                paraGrafica[unidad.id_unidad]["montoReferencial"] += tramite["montoContractual"];
                paraGrafica[unidad.id_unidad]["presupuesto"] += requerimiento.actividad.precTotal;;
              }
            }*/
            }}
          });
          this.setState({
            listaActividad: results,
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
    this.getMontoContractual();
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
        <Container style={{ background: "white", padding: "1%", textAlign: "center"  }}>
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
          <Table striped bordered hover id="table-to-xls">
            <Col>
              <thead className="fila-titulo" style={{ height: 50 , borderColor: "#011d42" }}>
                <th width="20%">ActividadPoa</th>
                <th>Presupuesto Asignado</th>
                <th>Unidad Requerimiento</th>
                <th>Solicitud Asignada</th>
                <th>Monto Contractual</th>
                <th>Porcentaje</th>
                <th>Detalles</th>
              </thead>
              <tbody>
                {this.state.filtro == true ? (
                Object.values(this.state.listaActividad).map((elemento,index) => (
                  elemento.unidad == this.state.filtroValue ? (
                  <tr>
                    <td>{elemento.actividad}</td>
                    <td>${elemento.presupuesto}</td>
                    <td>{elemento.unidad}</td>
                    <td>{elemento.solicitud}</td>
                    <td>${elemento.montoReferencial}</td>
                    <td>
                      {((parseInt(elemento.montoContractual) * 100) /
                        elemento.presupuesto).toFixed(2) +
                        "%"}
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
                  Object.values(this.state.listaActividad).map((elemento,index) => (
                    <tr>
                      <td>{elemento.actividad}</td>
                      <td>${elemento.presupuesto}</td>
                      <td>{elemento.unidad}</td>
                      <td>{elemento.solicitud}</td>
                      <td>${elemento.montoReferencial}</td>
                      <td>
                        {((parseInt(elemento.montoContractual) * 100) /
                          elemento.presupuesto).toFixed(2) +
                          "%"}
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
                ))}
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
                  filename="POAvsMontoContractual"
                  sheet="Pagina1"
                  buttonText="Descargar Excel"
                ></ReactHTMLTableToExcel>
              </div>
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
            <th>Codigo Trámite</th>
            <th>Codigo Solicitud</th>
            <th>Monto Cotizacion Referencial</th>
            </thead>
            <tbody>
            {parseInt(this.state.selActividad) >= 0 ? (
                  Object.values(this.state.numSolicitudes).map((elemento) => (
                    elemento.id_actividad == parseInt(this.state.selActividad) & elemento.unidad == this.state.selUnidad ? (
                    <tr>
                      <td>{elemento.numTramite}</td>
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
            <ModalTitle>Poa Vs M.Contractual</ModalTitle>
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