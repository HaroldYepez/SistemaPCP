import { LlenarBDservice } from "../services/LlenarBDservice";
import React, { Component } from "react";
import { UnidadService } from "../services/UnidadService";
import { ActividadService } from "../services/ActividadService";
import { RequerimientoService } from "../services/RequerimientoService";
//import Actividad from com.example.sistemaPCP.model.Actividad;

export default class LlenarBD extends Component {

    constructor() {
        super();
        this.state = {
          Tactividades: [],
          unidad: [],
          Trequerimientos: [],
        };
        
        this.actividadService = new ActividadService();
        this.unidadService = new UnidadService();
        this.requerimientoSevice = new RequerimientoService();
        this.llenarbdservice = new LlenarBDservice();
     
      }

      getActividades = () => {
        
        this.unidadService.getAll().then((data) => {
            
            var requerimiento = {};
            var actividades = {};
            data.map((elemento1) => {
                
                
                  fetch('http://192.168.253.6:8080/api/poaactividad/GetActividadByUnidad/'+elemento1.id_unidad+"/"+2021)
			            .then(response => response.json())
			            .then((data2) => {
                    
                    data2.map((elemento2) => {
                        if (actividades[elemento2.idactividad] == null){
                            var act ={};
                            act["id_actividad"] = elemento2.idactividad;
                            act["descripcion_acti"] = elemento2.actividad;
                            act["precTotal"] = elemento2.totalProyectado;
                            //this.actividadService.putAll(act);
                            fetch('http://localhost:8080/api/actividad/save',{
                              method: 'PUT',
                              mode: 'cors',
                              credentials: 'same-origin',
                              headers:{
                              'Content-Type':'application/json',
                              'Authorization': 'Basic ' + btoa('postgres:1234'),
                              },
                              body: JSON.stringify(act)
                            })
                            actividades[elemento2.idactividad] = act;
                            var temp = {};
                            temp["id_requerimiento"] = elemento2.idrequerimiento;
                            temp["descripcion"] = elemento2.requerimiento;
                            temp["valorPresupuesto"] = elemento2.totalProyectado;
                            temp["actividad"] = elemento2.idactividad;
                            requerimiento[elemento2.idrequerimiento] = temp;
                        }else{
                            actividades[elemento2.idactividad]["precTotal"] += elemento2.totalProyectado;
                            var temp2 = {};
                            temp2["id_requerimiento"] = elemento2.idrequerimiento;
                            temp2["descripcion"] = elemento2.requerimiento;
                            temp2["valorPresupuesto"] = elemento2.totalProyectado;
                            temp2["actividad"] = elemento2.idactividad;
                            requerimiento[elemento2.idrequerimiento] = temp2;
                        }
                        

                    });    
                });

                this.setState({
                    Tactividades: actividades,
                    Trequerimientos: requerimiento,
                    
                });
                  
            });
             
        });
      };

      

      componentDidMount() {
        this.getActividades();


        
      }

      render(){
          return(
            <div>
              {Object.values(this.state.Tactividades).map((elemento) =>(
                <text>{elemento}</text>
              
              ))}
              
            </div>
             
            
          );
      }
}