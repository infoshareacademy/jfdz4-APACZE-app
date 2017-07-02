import React from 'react'
import ReactDOM from 'react-dom'
import { browserHistory } from 'react-router'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { Provider } from 'react-redux'
import firebase from 'firebase'
import { Grid } from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'

import store from './store'
import App from './App';
import SearchForm from './components/SearchForm'
import RegistrationForm from './components/RegistrationFormView'
import Users from './components/Users'

var config = {
  apiKey: "AIzaSyAHIAHM0WNO3yJTREg5Yzc8ZDXGDf3FdSE",
  authDomain: "apacze-dc0a7.firebaseapp.com",
  databaseURL: "https://apacze-dc0a7.firebaseio.com",
  projectId: "apacze-dc0a7",
  storageBucket: "apacze-dc0a7.appspot.com",
  messagingSenderId: "471833026040"
};
firebase.initializeApp(config);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Grid>
        <Route exact path="/" component={App}/>
        <Route path="/search" component={SearchForm}/>
        <Route path="/register" component={RegistrationForm}/>
        <Route path="/users" component={Users}/>
      </Grid>
    </Router>
  </Provider>,
  document.getElementById('root')
)