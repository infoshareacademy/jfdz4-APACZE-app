import React, { Component }  from 'react'
import {Form, FormGroup, FormControl, Col, Checkbox, ControlLabel, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { compose } from "redux"
import { connect } from "react-redux"
import actions from './logActions'

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }

    this.renderAlert = this.renderAlert.bind(this);
  }

  onSubmit(e) {
    e.preventDefault()
  }

  onChange(e) {
    this.setState( { [e.target.name]: e.target.value } )
  }

  handleFormSubmit({ email, password }) {
    // Need to do something to log user in
    this.props.signinUser({ email, password });
  }

  renderAlert() {
    const { errorMessage } = this.props;
    if (errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {errorMessage}
        </div>
      );
    }
  }

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <Form horizontal
              onSubmit={this.onSubmint}
        >
          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} smOffset={1} xs={2}>
              E-mail
            </Col>
            <Col xs={8} sm={7}>
              <FormControl type="email" placeholder="E-mail" {...email}/>
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} smOffset={1} xs={2}>
              Hasło
            </Col>
            <Col xs={8} sm={7}>
              <FormControl type="password" placeholder="Hasło" {...password}/>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col xsOffset={2} smOffset={3} xs={8}>
              <Checkbox>Zapamiętaj mnie</Checkbox>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col xsOffset={2} smOffset={3} xs={8}>
              {this.renderAlert()}
              <Button action="submit" className="btn btn-primary">
                <Link to={'/'}>
                  Zaloguj
                </Link>
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

const mapStateToProps = state => {
  return {
    errorMessage: state.auth.error
  };
};

export default compose(
  connect(mapStateToProps, actions)
)(LoginForm)