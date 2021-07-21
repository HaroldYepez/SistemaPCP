import React,{Component}from 'react';
import './App.css';
import { UnidadService } from './services/UnidadService';
import Footer from './component/Footer';
import {Container, Row,Col} from 'react-bootstrap';
import NavigationBar from './component/NavigationBar';
import {BrowserRouter as Router , Switch, Route} from 'react-router-dom';
import POAvsC from './component/POAvsC';
//import POAvsMC from './component/POAvsMC';
//import POAvsS from './component/POAvsS';
// import Inicio from './component/Inicio';

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
      <Router>
        <NavigationBar/>
        <Container>
          <Row>
          <Col>
            
            
            <Route path="/POAvsC" exact component={POAvsC}/>
           
            </Col>
          </Row>
        </Container>
        <Footer/>
      
    </Router>
    );
  }
}