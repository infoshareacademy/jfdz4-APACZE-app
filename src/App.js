import React from 'react'
import { Col, Row } from 'react-bootstrap'
import firebase from 'firebase'

import LoginForm from './components/LoginFormView'
import SearchForm from './components/SearchForm'
import MenuForm from './components/MenuFormView'

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
                <LoginForm/>
                :
                <div>
                  <div style={{padding: '20px 20px', backgroundColor: '#B54328',
                    color: 'white', textAlign: 'right'}}>
                    Zalogowany użytkownik: {this.state.user.email}
                  </div>
                  <MenuForm/>
                  <SearchForm/>
                </div>
            }
          </Col>
          </Row>
        </div>
      </div>
    )
  }
}