import React from 'react'
import ReactDOM from 'react-dom/client'
import AdminApp from './AdminApp.jsx'

const rootElement = document.getElementById('custom-admin-root')

console.log("Tentando montar React Admin. Elemento encontrado?", !!rootElement)  // Debug

if (rootElement) {
  console.log("Montando AdminApp...")  // Debug
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <AdminApp />
    </React.StrictMode>
  )
} else {
  console.error('Elemento #custom-admin-root não encontrado no DOM!')
}