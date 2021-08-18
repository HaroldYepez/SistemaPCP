import axios from 'axios';

export class ActividadService{
    baseUrl="/actividad/";
    getAll(){
        return axios.get('http://localhost:8080/api/actividad/'+"all").then(res => res.data)
      
    }

    putAll(actividad){
        console.log(actividad)
        axios.put(this.baseUrl+"save", {Actividad: actividad} )
    }
    
  
}