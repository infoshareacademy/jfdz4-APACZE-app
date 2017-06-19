import React from 'react'
import { Col, Row } from 'react-bootstrap'
import firebase from 'firebase'

import LoginForm from './components/LoginFormView'


export default class App extends React.Component {

  state = {
    user: null
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

        <div>
          <Row>
          <Col smOffset={1} xs={2}></Col>
          <Col xs={8} sm={7}>
            {
              this.state.user === null ?
                null
                :
                <p>
                  Użytkownik {this.state.user.email} jest zalogowany
                  <button onClick={() => firebase.auth().signOut()}>
                    Wyloguj
                  </button>
                </p>
            }
          </Col>
          </Row>
        </div>
        <LoginForm/>
      </div>
    )
  }
}