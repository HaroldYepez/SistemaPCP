import React from 'react';
import {Container} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import './NavigationBar.css'
import './estilos.css'

class Inicio extends React.Component{

    render(){
        return(
            <Container className="container2" >
                <Container className="container-video">
                    <Col md="auto" style={{ paddingLeft: 10, paddingRight: 0, paddingTop: 10 }}>
                        <h1 className="titulo justify-content-center">Sistema PCP Planificación Compras Presupuesto</h1>
                        <h1 className="subtitulo">Video tutorial del funcionamiento de la plataforma</h1>
                        <iframe title="tutorial" width="500" height="300" class="embed-responsive-item text-center" src="https://www.youtube.com/embed/jXfGbKkys0E" frameborder="0" allowfullscreen></iframe>
                    </Col>
                
                </Container>
            </Container>
            
        );
    }
}

export default Inicio;