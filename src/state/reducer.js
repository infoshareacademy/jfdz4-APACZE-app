import users from './parts/users'

export default (state = {}, action) => {
  return {
    users: users(state.users, action),
  }
}

import busStopsSearch from './parts/busStopsSearch'

export default (state = {}, action = {}) => {
  return {
    busStopsSearch: busStopsSearch(state.busStopsSearch, action)
  }
}