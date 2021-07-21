import axios from 'axios';

export class UnidadService{
    baseUrl="http://localhost:8080/api/unidad/";
    getAll(){
        return axios.get(this.baseUrl+"all").then(res => res.data)
      
    }
}