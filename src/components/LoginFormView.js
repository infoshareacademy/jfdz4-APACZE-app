import React, { Component }  from 'react'
import {Form, FormGroup, FormControl, Col, ControlLabel, Button} from 'react-bootstrap'
import {BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import firebase from 'firebase'

export default connect(
  state => ({
    user: state.user || null
  }),
  dispatch => ({
    login: () => dispatch({type: 'AUTH_USER'}),
    loguot: () => dispatch({type: 'AUTH/LOGOUT'}),
    failed: () => dispatch({type: 'UNAUTH_USER'})
  })
)(
  class LoginForm extends React.Component {

  state = {
    email: '',
    password: ''
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  handleSubmit = event => {
    event.preventDefault()
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(
      data => console.log('data: ', data)
    ).catch(
      error => console.log('error: ', error)
    )
  }

  render() {

    return (
      <div>
        <Form horizontal
              onSubmit={this.onSubmit}
        >
          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} smOffset={1} xs={2}>
              E-mail
            </Col>
            <Col xs={8} sm={7}>
              <FormControl type="email" placeholder="E-mail"
                           value={this.state.email} onChange={this.handleChange}/>
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} smOffset={1} xs={2}>
              Hasło
            </Col>
            <Col xs={8} sm={7}>
              <FormControl type="password" placeholder="Hasło"
                           value={this.state.password} onChange={this.handleChange}/>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col xsOffset={2} smOffset={3} xs={8}>
              <Button action="submit" className="btn btn-primary">

                Zaloguj

              </Button>
              <Button type="submit">
                <Link to={'/search'}>
                  Wyszukaj
                </Link>
              </Button>
              <Button type="submit">
                <Link to={'/register'}>
                  Zarejestruj
                </Link>
              </Button>
              <Button type="submit">
                <Link to={'/users'}>
                  Użytkownicy
                </Link>
              </Button>

            </Col>
          </FormGroup>
        </Form>
      </div>
    )
  }
}
)
