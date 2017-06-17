const INITIAL_STATE = {};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    // Successful authentication
    case action.type === 'AUTH_USER':
      return { ...state, authenticated: true, error: '' };
    case action.type === 'UNAUTH_USER':
      return { ...state, authenticated: false };
    case action.type === 'AUTH_ERROR':
      return { ...state, error: action.payload };
    case action.type === 'FETCH_MESSAGE':
      return { ...state, message: action.payload }
    default:
      return state;
  }
};
