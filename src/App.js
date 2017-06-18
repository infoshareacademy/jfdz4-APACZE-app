import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import {
  Grid
} from 'react-bootstrap'
import LoginForm from './LoginFormView'
import SearchForm from './SearchForm'
import SearchResult from './SearchResult'

const App = () => (
      <Router>
        <Grid>
        <Route exact path="/" component={LoginForm}/>
        <Route path="/search" component={SearchForm}/>
        <Route path="/result" component={SearchResult}/>
        </Grid>
      </Router>
)

export default App;
