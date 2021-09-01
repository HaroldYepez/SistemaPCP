import axios from 'axios';

export class TramiteService{
    baseUrl="http://localhost:8080/api/tramite/";
    getAll(){
        return axios.get(this.baseUrl+"all").then(res => res.data)
      
    }
    gellYear(year){
        return axios.get(this.baseUrl+year).then(res=> res.data)
    }
   
}