import React from 'react';
import './App.css';
import {Container} from 'react-bootstrap';
import NavigationBar from './components/NavigationBar';
import Inicio from './components/Inicio';
import POAvsS from './components/POAvsS';
import POAvsC from './components/POAvsC';
import POAvsMC from './components/POAvsMC';
import Footer from './components/Footer';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


function App() {
  return (
    <Router>
        <NavigationBar/>
        <Container>
          <Row>
            <Col>
            <Switch>
            <Route path="/" exact component={Inicio}/>
            <Route path="/POAvsS" exact component={POAvsS}/>
            <Route path="/POAvsC" exact component={POAvsC}/>
            <Route path="/POAvsMC" exact component={POAvsMC}/>
            </Switch>
            </Col>
          </Row>
          
        </Container>
        <Footer/>
      
    </Router>
  );
}

export default App;
