import { createStore } from 'redux'
import reducer from './state/reducer'
import { AUTH_USER } from './components/logActions'

const persistedUsers = JSON.parse(localStorage.getItem('app'))
const initialState = {
  users: persistedUsers
}

const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

store.subscribe(
  () => {
    const stateToPersist = store.getState().users
    localStorage.setItem('app', JSON.stringify(stateToPersist))
  }
)

const token = localStorage.getItem('token'); // Get JWT token

if (token) { // If a token is available, set authenticated to true
  store.dispatch({ type: AUTH_USER });
}

export default store
