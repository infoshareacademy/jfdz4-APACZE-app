import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import firebase from 'firebase'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'

import store from './store'
import App from './App';

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
    <App/>
  </Provider>,
  document.getElementById('root')
);
