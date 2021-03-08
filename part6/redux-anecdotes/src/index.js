import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import newStore from './store'

ReactDOM.render(
  <Provider store={newStore()}>
    <App />
  </Provider>,
  document.getElementById('root')
)