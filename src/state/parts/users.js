const initialState = {
  data: null,
  fetching: false,
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'users/FETCH__BEGIN':
      return {
        ...state,
        fetching: true
      }
    case 'users/FETCH__SUCCESS':
      return {
        ...state,
        fetching: false,
        data: action.data,
        error: null
      }
    case 'users/FETCH__FAIL':
      return {
        ...state,
        fetching: false,
        error: action.error
      }
    default:
      return state
  }
}
