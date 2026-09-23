import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import { CartProvider } from './contexts/CartContext' // 1. Importe o CartProvider

function ForceAdminRedirect() {
  // window.location.replace força o browser a buscar a página direto do servidor Django
  window.location.replace('/admin/');
  return null; 
}

function App() {
  const [user, setUser] = useState(null)
  const [csrf, setCsrf] = useState('')

  useEffect(() => {
    if (window.__INITIAL_DATA__) {
      setUser(window.__INITIAL_DATA__.user)
      setCsrf(window.__INITIAL_DATA__.csrf_token)
    }
  }, [])

  return (
    <Router>
      {/* 2. Envolva o conteúdo da aplicação dentro do CartProvider */}
      <CartProvider>
        <div className="container mt-4">
          <HomePage user={user} csrf={csrf} />
        </div>
      </CartProvider>
    </Router>
  )
}

export default App