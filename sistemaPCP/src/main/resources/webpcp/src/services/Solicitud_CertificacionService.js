import axios from 'axios';

export class Solicitud_CertificacionService{
    
    baseUrl="http://localhost:8080/api/solicitud_certificacion/";
    getAll(){
        return axios.get(this.baseUrl+"all").then(res => res.data)
      
    }
    
}