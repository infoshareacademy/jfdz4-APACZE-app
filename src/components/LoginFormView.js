import React from 'react'
import {Form, FormGroup, FormControl, Col, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import firebase from 'firebase'
import './LoginFormView.css'

export default class LoginForm extends React.Component {

  state = {
    email: '',
    password: '',
    user: null
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  handleSubmit = event => {

    event.preventDefault()

    let email = this.state.email
    let password = this.state.password
    if (email.length < 4) {
      alert('Proszę wprowadzić poprawny email');
      return;
    }
    if (password.length < 6) {
      alert('Hasło musi posiadać długość przynajmniej 6 znaków');
      return;
    }

    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(
      data => console.log('data: ', data)
    ).catch(
      error => {
        if (error.code === 'auth/invalid-email')
          return alert('Podany email jest nieprawidłowy');
        if (error.code === 'auth/user-not-found')
          return alert('Musisz się najpierw zarejestrować');
        if (error.code === 'auth/wrong-password')
          return alert('Hasło jest nieprawidłowe')
        console.log(error)
      }
    )

    this.setState({
      name: '',
      email: '',
      password: ''
    });
  }

  handleGoogleLogIn = event => {

    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).then().catch();

    this.setState({
      name: '',
      email: '',
      password: ''
    });
  }

  componentWillMount() {

    this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          user: user
        })
      } else {
        this.setState({
          user: null
        })
      }
    });
  }

  componentWillUnmount () {
    this.unsubscribe()
  }

  render() {

    return (
      <div>
        <Form horizontal
              onSubmit={this.handleSubmit}
        >

          <div className="login-controls-wrapper">

            <Button onClick={this.handleGoogleLogIn} className="login-google-button">
              Zaloguj przez Google
            </Button>
            <p className="login-form-or">- lub -</p>
            <FormGroup controlId="formHorizontalEmail">
              <Col smOffset={1} xs={2}/>
              <Col xs={8} sm={7}>
                <FormControl type="email" placeholder="E-mail" name="email"
                             value={this.state.email} onChange={this.handleChange} autoComplete="email"
                             className="login-form-control"/>
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword">
              <Col smOffset={1} xs={2}/>
              <Col xs={8} sm={7}>
                <FormControl type="password" placeholder="Hasło" name="password"
                             value={this.state.password} onChange={this.handleChange} autoComplete="new-password"
                             className="login-form-control"/>
              </Col>
            </FormGroup>

            <FormGroup>
              <Col xsOffset={2} smOffset={3} xs={8}>
                <Button type="submit" className="login-btn login-btn-primary">
                  Zaloguj
                </Button>
                <Button type="submit">
                  <Link to={'/register'}>
                    Zarejestruj
                  </Link>
                </Button>

                <Button type="submit">
                  <Link to={'/search'}>
                    Wyszukaj
                  </Link>
                </Button>
              </Col>
            </FormGroup>

          </div>
        </Form>

      </div>
    )
  }
}

