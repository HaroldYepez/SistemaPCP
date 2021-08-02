import axios from 'axios';

export class SolicitudService{
    baseUrl="http://localhost:8080/api/solicitud/";
    getAll(){
        return axios.get(this.baseUrl+"all").then(res => res.data)
      
    }
    getId(id){
        return axios.get(this.baseUrl+"find/"+id).then(res=>res.data)

    }
}