import React from 'react'
import {Form, FormGroup, FormControl, Col, ControlLabel, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import firebase from 'firebase'

export default class RegistrationForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  handleSubmit = (e, message) => {
    e.preventDefault();

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

    //tutaj zapis w firebase
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(
        () => this.props.history.push('/')
      )
      .catch(function (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
        if (errorCode === 'auth/weak-password') {
          alert('Hasło jest zbyt słabe');
        } else {
          alert(errorMessage);
        }
        console.log(errorMessage);
    });


    this.setState({
      name: '',
      email: '',
      password: ''
    });
  };

  render() {
    return (
      <Form horizontal
        onSubmit={this.handleSubmit}
        onError={(errors, data) => console.log('error', errors, data)}
      >

        <FormGroup>
          <Col smOffset={1} xs={2}>
          </Col>
          <Col xs={8} sm={7}>
            <h4>Rejestracja konta</h4>
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalEmail">
          <Col componentClass={ControlLabel} smOffset={1} xs={2}>
            E-mail
          </Col>
          <Col xs={8} sm={7}>
            <FormControl type="email" placeholder="E-mail"
             name='email' onChange={this.handleChange} autoComplete="email"/>
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalPassword">
          <Col componentClass={ControlLabel} smOffset={1} xs={2}>
            Hasło
          </Col>
          <Col xs={8} sm={7}>
            <FormControl type="password" placeholder="Hasło (min. 6 znaków, w tym znaki specjalne)"
             name='password' onChange={this.handleChange} autoComplete="new-password"/>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col xsOffset={2} smOffset={3} xs={8}>
            <Button type="submit" className="btn btn-primary">
              Zarejestruj
            </Button>
            <Button>
              <Link to={'/'}>
                Powrót do logowania
              </Link>
            </Button>
          </Col>
        </FormGroup>
      </Form>
    )
  }
}

