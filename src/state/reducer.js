import users from './parts/users'
import auth from './parts/authReducer'

export default (state = {}, action) => {
  return {
    users: users(state.users, action),
    auth: auth(state.auth, action)
  }
}
