import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.css'
import { AuthProvider } from './modules/AuthContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <div className="container">
        <App />
      </div>
    </AuthProvider>
  </React.StrictMode>,
)
