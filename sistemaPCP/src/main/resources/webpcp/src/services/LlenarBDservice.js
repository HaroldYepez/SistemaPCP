import axios from 'axios';
import { TimeScale } from 'chart.js';

export class LlenarBDservice{

    constructor(){
        this.state = {
            actualYear: ""
        }
    }

    getYear(){
        var fecha = new Date();
        var year = fecha.getFullYear();
        this.setState({
            actualYear: year
          });
    }
    

    baseUrl="http://192.168.253.6:8080/api/poaactividad/GetActividadByUnidad/";
    getAll(unidad){
        axios.get(this.baseUrl+unidad+"/"+this.state.actualYear)
        .catch(function (error) {
        if (error.response) {
            return error.response.then(res => res.data);
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }
        console.log(error.config);
        });
    }
}