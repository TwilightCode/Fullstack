

import { combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import {anecdoteReducer} from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import {notificationReducer} from './reducers/notificationReducer'

const reducer = combineReducers( {
    anecdotes: anecdoteReducer,
    notifications: notificationReducer,
    filter: filterReducer
})

const newStore = () => {
    const store = createStore(reducer, composeWithDevTools())
    return store
}
export default newStore