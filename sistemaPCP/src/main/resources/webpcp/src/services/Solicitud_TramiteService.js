import axios from 'axios';

export class Solicitud_TramiteService{
    
    baseUrl="http://localhost:8080/api/solicitud_tramite/";
    getAll(){
        return axios.get(this.baseUrl+"all").then(res => res.data)
      
    }
    
}