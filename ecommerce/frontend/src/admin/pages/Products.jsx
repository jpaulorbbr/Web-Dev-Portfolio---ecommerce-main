import React, { useState, useEffect } from 'react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: ''
  });
  
  // Estado exclusivo para armazenar o arquivo selecionado
  const [imageFile, setImageFile] = useState(null);

  const fetchProducts = () => {
    fetch('/api/products/')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Erro ao buscar produtos:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Trata a seleção do arquivo
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

  const handleSubmit = (e) => {
  e.preventDefault();

  const data = new FormData();
  data.append('name', formData.name);
  data.append('price', formData.price);
  data.append('description', formData.description);

  if (imageFile) {
    data.append('image', imageFile);
  }

  const url = editingProduct ? `/api/products/${editingProduct.id}/` : '/api/products/';
  const method = editingProduct ? 'PUT' : 'POST';

  fetch(url, {
    method: method,
    headers: {
      'X-CSRFToken': getCookie('csrftoken'), // Passa o token de segurança exigido pelo Django
    },
    body: data,
  })
    .then(async (res) => {
      if (!res.ok) {
        const errorData = await res.json();
        alert(`Erro de validação: ${JSON.stringify(errorData)}`);
        throw new Error('Falha ao salvar produto');
      }
      return res.json();
    })
    .then(() => {
      setFormData({ name: '', price: '', description: '' });
      setImageFile(null);

      const fileInput = document.getElementById('product-image-input');
      if (fileInput) fileInput.value = '';

      setEditingProduct(null);
      fetchProducts();
    })
    .catch((err) => console.error(err));
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name || '',
      price: product.price || '',
      description: product.description || ''
    });
    setImageFile(null); // Limpa a seleção do arquivo ao editar
  };

  const handleDelete = (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este produto?')) return;

    fetch(`/api/products/${id}/`, { method: 'DELETE' })
      .then((res) => {
        if (res.ok) fetchProducts();
      })
      .catch((err) => console.error(err));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Gerenciar Produtos</h1>

      {/* Formulário de Adicionar / Editar */}
      <form onSubmit={handleSubmit} style={{ backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '8px', marginBottom: '30px' }}>
        <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>
          {editingProduct ? 'Editar Produto' : 'Cadastrar Novo Produto'}
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '500px' }}>
          <input
            type="text"
            name="name"
            placeholder="Nome do produto"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <input
            type="number"
            step="0.01"
            name="price"
            placeholder="Preço (ex: 99.90)"
            value={formData.price}
            onChange={handleChange}
            required
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <textarea
            name="description"
            placeholder="Descrição"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          
          {/* Input para o Upload da Imagem */}
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Imagem do Produto:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required={!editingProduct} // Obrigatório apenas na criação
              style={{ padding: '4px 0' }}
            />
          </div>

          <div style={{ marginTop: '10px' }}>
            <button type="submit" style={{ padding: '8px 16px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '10px' }}>
              {editingProduct ? 'Atualizar' : 'Cadastrar'}
            </button>
            
            {editingProduct && (
              <button
                type="button"
                onClick={() => {
                  setEditingProduct(null);
                  setFormData({ name: '', price: '', description: '' });
                  setImageFile(null);
                }}
                style={{ padding: '8px 16px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                Cancelar
              </button>
            )}
          </div>
        </div>
      </form>

      {/* Tabela de Produtos */}
      {loading ? (
        <p>Carregando produtos...</p>
      ) : products.length === 0 ? (
        <p>Nenhum produto cadastrado no momento.</p>
      ) : (
        <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#eee' }}>
              <th>ID</th>
              <th>Imagem</th>
              <th>Nome</th>
              <th>Preço</th>
              <th>Descrição</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>
                  {product.image ? (
                    <img src={product.image} alt={product.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                  ) : (
                    'Sem imagem'
                  )}
                </td>
                <td>{product.name}</td>
                <td>R$ {product.price}</td>
                <td>{product.description || '-'}</td>
                <td>
                  <button onClick={() => handleEdit(product)} style={{ padding: '4px 8px', marginRight: '8px', cursor: 'pointer' }}>
                    Editar
                  </button>
                  <button onClick={() => handleDelete(product.id)} style={{ padding: '4px 8px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Products;