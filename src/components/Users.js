import React from 'react'
import { connect } from 'react-redux'
//import { Link } from 'react-router-dom'

export default connect(
  state => ({
    users: state.users
  }),
  dispatch => ({
    begin: () => dispatch({ type: 'users/FETCH__BEGIN' }),
    success: data => dispatch({ type: 'users/FETCH__SUCCESS', data }),
    fail: error => dispatch({ type: 'users/FETCH__FAIL', error }),
  })
)(
  class users extends React.Component {
    componentWillMount() {
      this.props.begin()
      fetch(
        `${process.env.PUBLIC_URL}/data/users.json`
      ).then(
        response => response.json()
      ).then(
        users => this.props.success(users)
      ).catch(
        error => this.props.fail('Połączenie przerwane')
      )
    }

    render() {
      return (
        <div>
          <h1>users</h1>
          {
            this.props.users.fetching ? 'Pobieranie użytkowników...' : null
          }

          {
            this.props.users.error || null
          }

          {
            this.props.users.data !== null ?
              <ul>
                {
                  this.props.users.data.map(
                    user => <li key={user.id}>{user.email}</li>
                  )
                }
              </ul> : null
          }
        </div>
      )
    }
  }
)
