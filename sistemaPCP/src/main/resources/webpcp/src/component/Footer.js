import React from 'react';
import {Col} from 'react-bootstrap';
import {Container} from 'react-bootstrap';
import './estilos.css';

class Footer extends React.Component{
    render(){
        return(
            <Container style={{position: 'absolute',padding:'1%',paddingBottom: '0%',maxWidth: '80%',marginLeft: '10%' ,backgroundColor: "#a3a3a3", marginBottom: '0%',bottom: "0px"}}>
                <Col>
                <h1 className="footer-text">Escuela Superior Politécnica del Litoral - Campus Gustavo Galindo - Guayaquil - Ecuador</h1>
                <h1 className="footer-text">© El contenido de esta obra es de propiedad intelectual de la ESPOL. Todos los derechos reservados. Prohibida su reproducción total o parcial,</h1>
                <h1 className="footer-text">comunicación pública o distribución sin autorización previa del titular de los derechos</h1>
                </Col>
            </Container>
        );
    }
}
export default Footer;