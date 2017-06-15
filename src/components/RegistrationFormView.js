import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import {Form, FormGroup, FormControl, Col, ControlLabel, Button} from 'react-bootstrap'
import Schema from 'form-schema-validation'
import {Link} from 'react-router-dom'
import firebase from 'firebase'
import actions from './logActions'

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
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    validators: [emailValidator()]
  },
  password: {
    type: String,
    required: true
  }
});

class RegistrationForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: ''
    }
  }

  handleChange = (e) => {
    let newState = {};
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  };

  handleSubmit = (e, message) => {
    e.preventDefault();

    console.log(this.state)

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
      //po then strona z informacją o sukcesie
      .then(
        () => this.props.history.push('/successForm')
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
        //schema={registrationSchema}
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
        <FormGroup controlId="formHorizontalName">
          <Col componentClass={ControlLabel} smOffset={1} xs={2}>
            Nazwa konta
          </Col>
          <Col xs={8} sm={7}>
            <FormControl type="name" placeholder="Nazwa" name='name' onChange={this.handleChange}/>
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalEmail">
          <Col componentClass={ControlLabel} smOffset={1} xs={2}>
            E-mail
          </Col>
          <Col xs={8} sm={7}>
            <FormControl type="email" placeholder="E-mail" name='email' onChange={this.handleChange}/>
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalPassword">
          <Col componentClass={ControlLabel} smOffset={1} xs={2}>
            Hasło
          </Col>
          <Col xs={8} sm={7}>
            <FormControl type="password" placeholder="Hasło (min. 6 znaków, w tym znaki specjalne)"
                         name='password' onChange={this.handleChange}/>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col xsOffset={2} smOffset={3} xs={8}>
            <Button type="submit">
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

const mapStateToProps = state => {
  return {
    //errorMessage: state.auth.error
  };
};

export default compose(
  connect(mapStateToProps, actions)
)(RegistrationForm)
