import React from 'react';
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
        <LoginForm/>
      </div>
    )
  }
}