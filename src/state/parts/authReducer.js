const initialState = {
  authenticated: false,
  logged: false,
  error: '',
  message: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    // Successful authentication
    case 'AUTH_USER':
      return { ...state, authenticated: true, error: '' };
    case 'UNAUTH_USER':
      return { ...state, authenticated: false };
    case 'AUTH_ERROR':
      return { ...state, error: action.payload };
    case 'FETCH_MESSAGE':
      return { ...state, message: action.payload }
    default:
      return state;
  }
}