import React from 'react'
import {Form, FormGroup, FormControl, Col, ControlLabel, Button} from 'react-bootstrap'
import Schema from 'form-schema-validation'
//import { Form, TextField, CheckboxField, SubmitField } from 'react-components-form'
import { Link } from 'react-router-dom'

const emailValidator = () => ({
  validator(value){
    const regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]?[a-zA-Z0-9]+(\.)?[a-zA-Z0-9]{0,6}?\.[a-zA-Z]{2,6}$/;
    if (!value.match(regex)) {
      return false;
    }
    return true;
  },
  errorMessage: 'Podana wartość nie jest adresem email'
});

const registrationSchema = new Schema({
  name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true,
    validators: [emailValidator()]
  },
  password: {
    type: String,
    required: true
  }
});

const RegistrationForm  = () => (
  <Form horizontal
    schema={registrationSchema}
    onSubmit={data => console.log(data)}
    onError={(errors, data) => console.log('error', errors, data)}
  >

    <FormGroup>
      <Col smOffset={1} xs={2}>
      </Col>
      <Col xs={8} sm={7}>
        <h4>Rejestracja konta</h4>
      </Col>
    </FormGroup>
    <FormGroup controlId="formHorizontalName">
      <Col componentClass={ControlLabel} smOffset={1} xs={2}>
        Nazwa konta
      </Col>
      <Col xs={8} sm={7}>
        <FormControl type="name" placeholder="Nazwa"/>
      </Col>
    </FormGroup>

    <FormGroup controlId="formHorizontalEmail">
      <Col componentClass={ControlLabel} smOffset={1} xs={2}>
        E-mail
      </Col>
      <Col xs={8} sm={7}>
        <FormControl type="email" placeholder="E-mail"/>
      </Col>
    </FormGroup>

    <FormGroup controlId="formHorizontalPassword">
      <Col componentClass={ControlLabel} smOffset={1} xs={2}>
        Hasło
      </Col>
      <Col xs={8} sm={7}>
        <FormControl type="password" placeholder="Hasło"/>
      </Col>
    </FormGroup>

    <FormGroup>
      <Col xsOffset={2} smOffset={3} xs={8}>
        <Button type="submit">
          <Link to={'/register'}>
            Zarejestruj
          </Link>
        </Button>
        <Button type="submit">
          <Link to={'/'}>
            Powrót do logowania
          </Link>
        </Button>
      </Col>
    </FormGroup>
  </Form>
);

export default RegistrationForm
