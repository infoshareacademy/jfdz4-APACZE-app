import React, { Component } from 'react'
import LoginForm from './components/LoginFormView'
import Users from './components/Users'

class App extends Component {
  render() {
    return (
      <div>
        <LoginForm/>
        <Users/>
      </div>
    );
  }
}

export default App;
