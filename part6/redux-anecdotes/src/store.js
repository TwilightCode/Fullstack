

import { combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import {anecdoteReducer} from './reducers/anecdoteReducer'
import {notificationReducer} from './reducers/notificationReducer'

const reducer = combineReducers( {
    anecdotes: anecdoteReducer,
    notifications: notificationReducer
})

const newStore = () => {
    const store = createStore(reducer, composeWithDevTools())
    return store
}
export default newStore