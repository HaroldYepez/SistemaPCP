
import React, { Component } from "react";
import { Col } from "react-bootstrap";
import "./estilos.css";
import DatePicker from 'react-datepicker';
import { FormGroup } from "react-bootstrap";
import 'react-datepicker/dist/react-datepicker.css'

class Fecha extends Component {
    constructor() {
        super(this.props);
        this.state = {
            date:new Date().getFullYear().toString()
         
        };
      }
      onChange=date=>{
        console.log(date.getFullYear())
        this.setState({date:date.getFullYear().toString()});
      }
  render() {
    return (
       
      <Col sm={4}>
       
        <FormGroup>
          <DatePicker
            showYearPicker
            value={this.state.date}
            onChange={this.onChange}
          />
        </FormGroup>
       
        
      </Col>
    );
  }
}
export default Fecha;
