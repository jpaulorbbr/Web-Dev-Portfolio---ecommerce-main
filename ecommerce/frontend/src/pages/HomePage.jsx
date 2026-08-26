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

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading = useState(true)]

  useEffect(() => {
    fetch('/api/products')
      .then ((res) => {
        if (!res.ok) throw new Error('Falha ao carregar produtos');
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Erro ao buscar catálogo:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Banner / Hero Section */}
      <div style={{ textAlign: 'center', marginBottom: '40px', padding: '40px', backgroundColor: '#f4f4f9', borderRadius: '8px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '10px' }}>Bem-vindo à Nossa Loja</h1>
        <p style={{ color: '#666' }}>Confira nossos produtos exclusivos cadastrados no sistema.</p>
      </div>

      {/* Grid de produtos */}
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Catálogo de Produtos</h2>
    
      {loading ? (
        <p>Carregando catálogo...</p>
      ) : products.length === 0 ? (
        <p>Nenhum produto disponível no momento.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
          {products.map((product) => (
            <div
              key={product.id}
              style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              <div>
                {/* Imagem do Produto */}
                <div style={{ width: '100%', height: '200px', backgroundColor: '#f0f0f0', borderRadius: '4px', overflow: 'hidden', marginBottom: '15px' }}>
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyCOntent: 'center', height: '100%', color: '#aaa' }}>
                      Sem foto
                    </div>
                  )}
                </div>

                {/* Detalhes do Produto */}
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>{product.name}</h3>
                <p style={{ color: '#666', fontSize: '14px', marginBottom: '12px' }}>
                  {product.description || 'Sem descrição disponível.'}
                </p>
              </div>

              <div>
                <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#2b2b2b', marginBottom: '10px' }}>
                  R$ {Number(product.price).toFixed(2)}
                </p>
                <button
                  onClick={() => alert(`Produto "${product.name}" adicionado ao carrinho!`)}
                  style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  Adicionar ao Carrinho
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;