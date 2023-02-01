import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { initFirestoreApp } from './config/firebase'
import './index.css'

initFirestoreApp()

ReactDOM.createRoot(document.getElementById('root')).render(
    <App />
)
