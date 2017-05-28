import users from './parts/users'

export default (state = {}, action) => {
  return {
    users: users(state.users, action)
  }
}
