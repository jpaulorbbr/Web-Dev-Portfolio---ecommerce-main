import { useState, useEffect } from 'react'
import axios from 'axios'

function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/admin/api/products/', { 
          withCredentials: true 
        })
        setProducts(response.data)
      } catch (error) {
        console.error("Erro ao carregar produtos:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const filteredProducts = products.filter(product =>
    product.name?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return <div className="text-center mt-5"><h4>Carregando produtos...</h4></div>
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>📦 Gerenciar Produtos</h3>
        <a href="#" className="btn btn-success">+ Novo Produto</a>
      </div>

      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="🔍 Buscar por nome do produto..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="card shadow-sm">
        <table className="table table-hover mb-0">
          <thead className="table-dark">
            <tr>
              <th>Nome</th>
              <th>Preço</th>
              <th>Estoque</th>
              <th>Categoria</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(product => (
              <tr key={product.id}>
                <td><strong>{product.name}</strong></td>
                <td>R$ {parseFloat(product.price || 0).toFixed(2)}</td>
                <td>{product.stock ?? 'N/A'}</td>
                <td>{product.category || 'Sem categoria'}</td>
                <td>
                  <button className="btn btn-sm btn-primary me-2">Editar</button>
                  <button className="btn btn-sm btn-danger">Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredProducts.length === 0 && (
        <p className="text-center text-muted mt-4">Nenhum produto encontrado.</p>
      )}
    </div>
  )
}

export default Products