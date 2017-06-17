import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {Grid} from 'react-bootstrap'
import firebase from 'firebase'

import LoginForm from './components/LoginFormView'
import SearchForm from './SearchForm'
import RegistrationForm from './components/RegistrationFormView'
import Users from './components/Users'

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
        {
          this.state.user === null ?
            null :
            <p>
              Hello {this.state.user.email}
              <button onClick={() => firebase.auth().signOut()}>
                Wyloguj
              </button>
            </p>
        }
        <LoginForm/>

        <Router>
          <Grid>
            <Route exact path="/" component={LoginForm}/>
            <Route path="/search" component={SearchForm}/>
            <Route path="/register" component={RegistrationForm}/>
            <Route path="/users" component={Users}/>

          </Grid>
        </Router>
      </div>
    )
  }
}