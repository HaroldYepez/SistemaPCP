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
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
            return error.response.then(res => res.data);
        } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
            console.log(error.request);
        } else {
        // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
        console.log(error.config);
        });
        /*
        try {
            var resp = axios.get(this.baseUrl+unidad+"/"+this.state.actualYear, {validateStatus: (status) => status === 400}).then(res => res.data)
            return resp
        } catch (err) {
            console.error("Error response:");
            console.error(err.response.data);    // ***
            console.error(err.response.status);  // ***
            console.error(err.response.headers); // ***
        } finally {
            console.log(resp);
        }*/
    }
}