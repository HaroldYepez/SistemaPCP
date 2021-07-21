import axios from 'axios';

export class SolicitudService{
    baseUrl="http://localhost:8080/api/solicitud/";
    getAll(){
        return axios.get(this.baseUrl+"all").then(res => res.data)
      
    }
    listarActividades(id){
        return axios.get(this.baseUrl+"SoliAct/"+id).then(res => res.data)
    }
}