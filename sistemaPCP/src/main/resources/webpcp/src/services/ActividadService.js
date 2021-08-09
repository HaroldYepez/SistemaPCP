import axios from 'axios';

export class ActividadService{
    baseUrl="http://localhost:8080/api/actividad/";
    getAll(){
        return axios.get(this.baseUrl+"all").then(res => res.data)
      
    }
    
  
}