import { useState, useEffect } from 'react'

const Products = () => {
  // Estado para armazenar os produtos que vêm do Django
  const [products, setProducts] = useState([]);
  // Estado para controlar se a página está carregando
  const [loading, setLoading] = useState(true);
  // Estado para capturar eventuais erros de conexão
  const [error, setError] = useState(null);

  useEffect(() => {
    //FUnção assíncrona que dispara a requisição
    const fetchProducts = async () => {
      try {
        // Graças ao proxy do Vite, podemos usar caminhos relativos!
        const response = await fetch('/api/products/');

        if (!response.ok) {
          throw new Error('Erro ao buscar os produtos do servidor.');
        }

        const data = await response.json();
        setProducts(data); // Salva os produtos no estado
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); //Finaliza o estado de carregamento
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="p-6">Carregando produtos...</div>;
  if (error) return <div className="p-6 text-red-500">Erro: {error}</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Produtos Cadastrados</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Adicionar Produto
        </button>
      </div>

      {products.length === 0 ? (
        <p className="text-gray-500">Nenhum produto encontrado no banco de dados. Cadastre um no admin do Django!</p>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preço</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#{product.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">R$ {product.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-3">Editar</button>
                    <button className="text-red-600 hover:text-red-900">Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Products;

{/* 
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

*/}