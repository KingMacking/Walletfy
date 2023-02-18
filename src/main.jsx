import React from 'react'
import ReactDOM from 'react-dom/client'

import UserContextProvider from './context/UserContext'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <UserContextProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </UserContextProvider>
)
