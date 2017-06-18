import users from './parts/users'
import busStopsSearch from './parts/busStopsSearch'

export default (state = {}, action) => {
  return {
    users: users(state.users, action),
    busStopsSearch: busStopsSearch(state.busStopsSearch, action)
  }
}
