import React from 'react';
import {Col} from 'react-bootstrap';
import {Container} from 'react-bootstrap';
import './estilos.css';

class Footer extends React.Component{
    render(){
        return(
            <footer class="footer-copyright text-center py-3" style={{backgroundColor: "#a3a3a3", bottom: "0", width: "100%", textAlign: "center"}}>
                <div>
                <h1 className="footer-text">Escuela Superior Politécnica del Litoral - Campus Gustavo Galindo - Guayaquil - Ecuador</h1>
                <h1 className="footer-text">© El contenido de esta obra es de propiedad intelectual de la ESPOL. Todos los derechos reservados. Prohibida su reproducción total o parcial,</h1>
                <h1 className="footer-text">comunicación pública o distribución sin autorización previa del titular de los derechos</h1>
                </div>
            </footer>
        );
    }
}
export default Footer;