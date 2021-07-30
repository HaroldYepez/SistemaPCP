import React,{Component}from 'react';
import './App.css';
import { UnidadService } from './services/UnidadService';
import Footer from './component/Footer';
import {Container, Row,Col} from 'react-bootstrap';
import NavigationBar from './component/NavigationBar';
import {BrowserRouter as Router , Switch, Route} from 'react-router-dom';
import POAvsC from './component/POAvsC';
// import POAvsMC from './component/POAvsMC';
import POAvsMCPrueba from './component/PAOvsMCPrueba';
import POAvsS from './component/POAvsSPrueba';
import Inicio from './component/Inicio';
import './component/NavigationBar.css';
import './component/estilos.css';
import POAvsSPrueba from './component/POAvsSPrueba';

export default class APP extends  Component{
  constructor(){
    super();
    this.state={};
    this.unidadService=new UnidadService();
  }
  componentDidMount(){
    this.unidadService.getAll().then(data=>this.setState({unidades:data}))
   
  }
  render(){
    return(
      <Router style={{ paddingBottom: '0%' }}>
        <NavigationBar/>
        <Container className="container2" style={{textAlign: 'center', marginLeft: '0%',background: 'white', maxWidth: '100%' }} >
          <Row>
          <Col>
            <Switch>
              <Route path="/" exact component={Inicio}/>
              <Route path="/POAvsS" exact component={POAvsSPrueba}/>
              <Route path="/POAvsC" exact component={POAvsC}/>
              <Route path="/POAvsMC" exact component={POAvsMCPrueba}/>
            </Switch>
          </Col>
          </Row>
        </Container>
        <Footer/>
      
    </Router>
    );
  }
}