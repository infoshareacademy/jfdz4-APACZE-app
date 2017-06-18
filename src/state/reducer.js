import busStopsSearch from './parts/busStopsSearch'

export default (state = {}, action = {}) => {
  return {
    busStopsSearch: busStopsSearch(state.busStopsSearch, action)
  }
}