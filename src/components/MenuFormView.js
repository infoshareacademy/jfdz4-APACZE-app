import React from 'react'
import firebase from 'firebase'
import Menu, {MenuItem} from 'rc-menu'
import 'rc-menu/assets/index.css'
import {Link} from 'react-router-dom'

export default class MenuForm extends React.Component {

  state = {
    user: null
  }

  handleClick = (info) => {
     if (info.key === '2')
     {return firebase.auth().signOut()}
  }

  componentWillMount() {

    this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
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

  componentWillUnmount () {
    this.unsubscribe()
  }

  render() {

    return (
    <Menu
      mode="horizontal"
      onClick={this.handleClick}>
      <MenuItem key="1"><Link to={'/register'}>
        Zarejestruj
      </Link></MenuItem>
      <MenuItem key="2">
        Wyloguj
      </MenuItem>

      {
        this.state.user === null ?
          null
          :
          this.state.user.email === 'aniahb@gmail.com' ?
            <MenuItem key="3"><Link to={'/users'}>
              Użytkownicy
            </Link></MenuItem>
            :
            null
      }

    </Menu>
    )
  }
}
