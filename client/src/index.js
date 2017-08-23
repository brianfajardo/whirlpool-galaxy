import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import 'materialize-css/dist/css/materialize.min.css'

import App from './components/App'
import configureStore from './store/configureStore'

// Temporary development helpers.
import axios from 'axios'
window.axios = axios


const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)