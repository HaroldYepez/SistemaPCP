import axios from 'axios';

export class CertificacionService{
    baseUrl="http://localhost:8080/api/certificacion/";
    getAll(){
        return axios.get(this.baseUrl+"all").then(res => res.data)
      
    }
   
}