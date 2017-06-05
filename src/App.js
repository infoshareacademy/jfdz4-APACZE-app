import React, { Component } from 'react';
import LoginForm from './LoginFormView'
import SearchForm from './SearchForm'

class App extends Component {
  render() {
    return (
      <LoginForm/>
      <SearchForm/>
    );
  }
}

export default App;
