import React from 'react'
import {Form, FormGroup, FormControl, Col, ControlLabel, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import firebase from 'firebase'
import authReducer from  '../state/parts/authReducer'


// export default connect(
//   state => ({
//     user: state.user || null
//   }),
//   dispatch => ({
//     login: () => dispatch({type: 'AUTH_USER'}),
//     loguot: () => dispatch({type: 'AUTH_LOGOUT'}),
//     failed: () => dispatch({type: 'UNAUTH_USER'})
//   })
// )(

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
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(
      data => console.log('data: ', data)
    ).catch(
      error => {
      if (error.code === 'auth/user-not-found')
        return alert('Musisz się najpierw zarejestrować');
      if (error.code === 'auth/wrong-password')
        return alert('Hasło jest nieprawidłowe')
        console.log(error)
      }
    )
  }

  componentWillMount() {

    firebase.auth().onAuthStateChanged(user => {
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


  render() {

    return (
      <div>
        <Form horizontal
              onSubmit={this.handleSubmit}
        >
          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} smOffset={1} xs={2}>
              E-mail
            </Col>
            <Col xs={8} sm={7}>
              <FormControl type="email" placeholder="E-mail" name="email"
                           value={this.state.email} onChange={this.handleChange}/>
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} smOffset={1} xs={2}>
              Hasło
            </Col>
            <Col xs={8} sm={7}>
              <FormControl type="password" placeholder="Hasło" name="password"
                           value={this.state.password} onChange={this.handleChange}/>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col xsOffset={2} smOffset={3} xs={8}>
              <Button type="submit" className="btn btn-primary">

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


              {
                this.state.user === null ?
                  null
                  :
                  this.state.user.email === 'aniahb@gmail.com' ?
                    <Button type="submit">
                      <Link to={'/users'}>
                        Użytkownicy
                      </Link>
                    </Button>
                    :
                    null
               }              

            </Col>
          </FormGroup>
        </Form>
      </div>
    )
  }
}
// )
