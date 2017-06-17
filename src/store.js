import { createStore } from 'redux'
import reducer from './state/reducer'

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

export default store
