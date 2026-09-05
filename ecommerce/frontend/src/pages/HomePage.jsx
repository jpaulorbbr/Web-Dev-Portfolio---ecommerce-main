{/*
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
*/}
      {/* Conteúdo da Home 
      <div className="mt-5">
         Seus cards, produtos, etc.
      </div>
    </div>
  )
}
*/}

import React,  { useState, useEffect } from 'react';
import { useCart } from '../contexts/CartContext';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart, totalItems } = useCart(); //Hook do carrinho!

  useEffect(() => {
    fetch('/api/products')
      .then ((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Erro ao buscar produtos:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Cabeçalho simples com indicador do carrinho */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Catálogo de Produtos</h2>
        <div style={{ fontWeight: 'bold', fontSize: '18px' }}>
          🛒 Carrinho: <span style={{ color: '#007bff' }}>{totalItems} itens</span>
        </div>
      </div>

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
          {products.map((product) => (
            <div key={product.id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px' }}>
              <div style={{ width: '100%', height: '180px', backgroundColor: '#eee', marginBottom: '10px' }}>
                {product.image && (
                  <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                )}
              </div>
              <h3>{product.name}</h3>
              <p style={{ fontWeight: 'bold', margin: '10px 0' }}>R$ {Number(product.price).toFixed(2)}</p>
              
              <button
                onClick={() => addToCart(product)}
                style={{ width: '100%', padding: '10px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                Adicionar ao Carrinho
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;