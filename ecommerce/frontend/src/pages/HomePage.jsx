import { useState, useEffect } from 'react'

export default function HomePage({ user, csrf }) {
  const handleLogout = async () => {
    try {
      const response = await fetch('/members/logout/', {
        method: 'POST',
        headers: {
          'X-CSRFToken': csrf,
          'Content-Type': 'application/json'
        },
        credentials: 'include', //importante
      });
    
      if (response.ok) {
        // Recarrega a página para pegar um CSRF token novo
        window.location.href = '/';
      } else {
        alert('Erro ao fazer logout:', error);
      }
    } catch (error) {
      console.error('Erro no logout:', error);
      // Fallback: recarrega mesmo se der erro
      window.location.href = '/';
    }
  };
  
  return (
    <div>
      <h1>🛒 E-commerce React + Django</h1>

      {user?.is_authenticated ? (
        <div className="mb-4">
          <p>Olá, <strong>{user.username}</strong>! Você está logado.</p>
          <button onClick={handleLogout} className="btn btn-danger">
            Sair
          </button>
        </div>
      ) : (
        <div className="mb-4">
          <a href="/members/login/" className="btn btn-primary me-2">
            Fazer Login
          </a>
          <a href="/members/register/" className="btn btn-success">
            Criar Conta
          </a>
        </div>
      )}

      {/* Conteúdo da Home */}
      <div className="mt-5">
        {/* Seus cards, produtos, etc. */}
      </div>
    </div>
  )
}