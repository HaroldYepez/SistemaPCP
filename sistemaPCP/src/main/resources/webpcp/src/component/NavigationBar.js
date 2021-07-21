import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import logo from './logo-gris.png';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
//import { ImExit } from 'react-icons/im';
//import {Link} from 'react-router-dom';
//import { NavLink } from 'react-router-dom';
import './NavigationBar.css'



class NavigationBar extends React.Component {



    render() {
        return (
            <Container style={{marginLeft:'0',marginRight:'0',paddingRight:'0', paddingLeft:'0', maxWidth:'100%'}}>
                <Row style={{marginTop:'1%', marginLeft:'10%', marginRight:'10%'}}>
                    <Col xs={12} md={8}>
                        <div style={{display:'flex'}}>
                            <div>
                                <img className='image-nav' src={logo} alt="Logo espol" />
                            </div>
                            <div style={{marginLeft:'10%',height:'100%', marginTop:'3%', marginBottom:'2%'}}>
                                <h1 className='h1-nav' xs lg="2">Sistema PCP</h1>
                                <h1 className='h2-nav' xs lg="2">Planificación Compras Presupuesto</h1>
                            </div>
                        </div>
                        
                    </Col>
                    <Col xs={6} md={4}>
                        <div style={{height:'100%', marginTop:'10%', marginBottom:'10%'}}>
                            <h1 className='h3-nav' xs lg="2">Nombre del usuario</h1>
                        </div>
                    </Col>

                </Row>
                <div style={{width:'100%'}}>
                    <Nav className="navbar-fondo"
                        activeKey="/inicio" as="ul"
                        style={{paddingLeft:'10%', borderTop:'2px solid #F8B82B'}}
                    >
                        <Nav.Item as="li" style={{ marginTop: 3 }}>
                            <Nav.Link href="/inicio" className='custom-text-nav '>Inicio</Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li" style={{ marginTop: 3 }}>
                            <Nav.Link href="/inicio" className='custom-text-nav '>POA vs Solicitudes</Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li" style={{ marginTop: 3 }}>
                            <Nav.Link href="/inicio" className='custom-text-nav '>POA vs Certificación</Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li" style={{ marginTop: 3 }}>
                            <Nav.Link href="/inicio" className='custom-text-nav '>POA vs M.Contractual</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </div>
            </Container>

            // <Container className="container" >
            //     <Col >
            //         <Row className="custom-bar">
            //             <Col md="4" style={{ paddingLeft: 210, paddingRight: 0 }}>
            //                 <img className='image-nav' src={logo} alt="Logo espol"/>
            //             </Col>
            //             <Col  md="4" style={{ paddingLeft: 10, paddingRight: 0, paddingTop: 10 }}>
            //                 <h1 className='h1-nav' xs lg="2">Sistema PCP</h1>
            //                 <h1 className='h2-nav' xs lg="2">Planificación Compras Presupuesto</h1>
            //             </Col>
            //             <Col  md="4" style={{ paddingLeft: 600, paddingRight: 0, paddingTop: 32 }}>
            //                 <h1 className='h3-nav' xs lg="2">Nombre del usuario</h1>
            //             </Col>
            //         </Row>
            //         <Row style={{ height: 1, marginBottom: 0, marginTop: 3}}>
            //             <div class="hr"><hr /></div>
            //         </Row>
            //         <Row >
            //             <Nav className='custom-bar' as="ul">

            //                 <Nav.Item  style={{ marginLeft: 200, marginRight: 0, marginTop: 2}} as="li" >
            //                     <NavLink style={{color: 'white', textDecoration: 'none'}} activeStyle={{color: '#F8B82B', textDecoration: 'none'}} className='custom-text-nav nav-links nav-link' exact to={""}>Inicio</NavLink>
            //                 </Nav.Item >
            //                 <Nav.Item as="li" style={{marginTop: 2}} >
            //                     <NavLink style={{color: 'white', textDecoration: 'none'}} activeStyle={{color: '#F8B82B', textDecoration: 'none'}} className='custom-text-nav nav-links nav-link' exact to={"POAvsS"}>POA vs Solicitudes</NavLink>
            //                 </Nav.Item>
            //                 <Nav.Item as="li" style={{marginTop: 2}}>
            //                     <NavLink style={{color: 'white', textDecoration: 'none'}} activeStyle={{color: '#F8B82B', textDecoration: 'none'}} className='custom-text-nav nav-links nav-link' exact to={"POAvsC"}>POA vs Certificación</NavLink>
            //                 </Nav.Item>
            //                 <Nav.Item as="li" style={{marginTop: 2}}>
            //                     <NavLink style={{color: 'white', textDecoration: 'none'}} activeStyle={{color: '#F8B82B', textDecoration: 'none'}} className='custom-text-nav nav-links nav-link' exact to={"POAvsMC"}>POA vs M.Contractual</NavLink>
            //                 </Nav.Item>
            //                 <Nav.Item as="li" style={{ marginLeft: 440, marginRight: 0, marginTop: 10}}>
            //                     <p className='custom-text-nav'>[rol del usuario]</p>
            //                 </Nav.Item>
            //                 <Nav.Item as="li">
            //                     <NavLink style={{color: 'white', textDecoration: 'none'}} activeStyle={{color: '#F8B82B', textDecoration: 'none'}} className='custom-text-nav nav-links nav-link' exact to={""}><ImExit/></NavLink>
            //                 </Nav.Item>
            //             </Nav>
            //         </Row>
            //     </Col>
            // </Container>

        );
    }
}

export default NavigationBar;