import axios from 'axios';

export class RequerimientoService{
    baseUrl="http://localhost:8080/api/requerimiento/";
    getAll(){
        return axios.get(this.baseUrl+"all").then(res => res.data)
      
    }
    getID(id){
        return axios.get(this.baseUrl+"/find/"+id).then(res => res.data)
    }
}