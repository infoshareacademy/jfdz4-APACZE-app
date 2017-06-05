import React from 'react'
import {Form, FormGroup, FormControl, Col, Checkbox, ControlLabel, Button} from 'react-bootstrap'

class LoginForm extends React.Component {
  render() {
    return (

      <div>
        <Form horizontal>
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
              <Checkbox>Zapamiętaj mnie</Checkbox>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col xsOffset={2} smOffset={3} xs={8}>
              <Button type="submit">
                Zaloguj
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    )
  }
}

export default LoginForm