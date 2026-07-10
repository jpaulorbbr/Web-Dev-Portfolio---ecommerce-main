import { useState, useEffect } from 'react'
import axios from 'axios'

function AdminDashboard() {
  const [stats, setStats] = useState({ totalUsers: 0, totalProducts: 0, totalStaff: 0 })
  const [recentUsers, setRecentUsers] = useState([])
  const [recentProducts, setRecentProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [usersRes, productsRes] = await Promise.all([
          axios.get('/admin/api/users/', { withCredentials: true }),
          axios.get('/admin/api/products/', { withCredentials: true })
        ])

        setRecentUsers(usersRes.data.slice(0, 5))
        setRecentProducts(productsRes.data.slice(0, 5))
        setStats({
          totalUsers: usersRes.data.length,
          totalProducts: productsRes.data.length,
          totalStaff: usersRes.data.filter(u => u.admin_staff || u.is_superuser).length,
        })
      } catch (error) {
        console.error("Erro ao carregar dashboard:", error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading) return <div className="text-center mt-5"><h4>Carregando painel...</h4></div>

  return (
    <div>
      <h2 className="mb-4">📊 Dashboard Administrativo</h2>

      <div className="row g-4 mb-5">
        <div className="col-md-4">
          <div className="card text-white bg-primary shadow">
            <div className="card-body">
              <h5>Total de Usuários</h5>
              <h2>{stats.totalUsers}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-success shadow">
            <div className="card-body">
              <h5>Total de Produtos</h5>
              <h2>{stats.totalProducts}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-dark shadow">
            <div className="card-body">
              <h5>Staff / Admins</h5>
              <h2>{stats.totalStaff}</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6">
          <div className="card shadow mb-4">
            <div className="card-header bg-dark text-white">
              <h5>👥 Últimos Usuários</h5>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                {recentUsers.map(user => (
                  <li key={user.id} className="list-group-item">
                    <strong>{user.username}</strong> — {user.email}
                  </li>
                ))}
              </ul>
              <a href="/admin/users/" className="btn btn-primary btn-sm mt-3">Ver Todos</a>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card shadow mb-4">
            <div className="card-header bg-dark text-white">
              <h5>📦 Últimos Produtos</h5>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                {recentProducts.map(p => (
                  <li key={p.id} className="list-group-item d-flex justify-content-between">
                    <span>{p.name}</span>
                    <strong>R$ {p.price}</strong>
                  </li>
                ))}
              </ul>
              <a href="/admin/products/" className="btn btn-primary btn-sm mt-3">Gerenciar Produtos</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard