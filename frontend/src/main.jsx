import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import {Provider} from 'react-redux'
import {Toaster} from 'react-hot-toast'
import { store } from './app/Store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <App />
      <Toaster/>
    </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
