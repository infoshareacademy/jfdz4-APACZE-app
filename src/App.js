import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Grid } from 'react-bootstrap'
import LoginForm from './components/LoginFormView'
import SearchForm from './SearchForm'
import RegistrationForm from './components/RegistrationFormView'
import RegistrationSuccessForm from './components/RegistrationSuccessFormView'
import Users from './components/Users'

const App = () => (
      <Router>
        <Grid>
          <Route exact path="/" component={LoginForm}/>
          <Route path="/search" component={SearchForm}/>
          <Route path="/register" component={RegistrationForm}/>
          <Route path="/users" component={Users}/>
          <Route path="/successForm" component={RegistrationSuccessForm}/>          
          
        </Grid>
      </Router>
)

export default App
