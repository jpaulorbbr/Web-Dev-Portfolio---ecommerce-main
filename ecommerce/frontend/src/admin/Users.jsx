import { useState, useEffect } from 'react'
import axios from 'axios'

function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    console.log("Iniciando fetch de usuários...")

    axios.get('/admin/api/users', { withCredentials: true })
      .then(res => {
        console.log("Usuários recebidos:", res.data.length, "registros")
        setUsers(res.data)
      })
      .catch(err => {
        console.error("Erro completo:", err)
        setError("Erro ao carregar usuários.")
      })
      .finally(() => setLoading(false))
  }, [])

  const filteredUsers = users.filter(user =>
    user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) return <div className="text-center mt-5"><h4>Carregando usuários...</h4></div>
  if (error) return <div className="alert alert-danger mt-4">{error}</div>

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>👥 Gerenciar Usuários</h3>
        <a href="/amin/register" className="btn btn-success">+ Novo Usuário</a>
      </div>

      <input
        type="text"
        className="form-control mb-4"
        placeholder="🔍 Buscar por nome ou email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="card shadow-sm">
        <table className="table table-hover mb-0">
          <thead className="table-dark">
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Staff</th>
              <th>Superuser</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td><strong>{user.username}</strong></td>
                <td>{user.email}</td>
                <td>{user.admin_staff ? '✅ Sim' : '❌ Não'}</td>
                <td>{user.is_superuser ? '✅ Sim' : '❌ Não'}</td>
                <td>
                  <a href={`/admin/users/${user.username}`} className="btn btn-sm btn-primary me-2">Ver</a>
                  <button className="btn btn-sm btn-danger">Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredUsers.length === 0 && (
        <p className="text-center text-muted mt-4">Nenhum usuário encontrado</p>
      )}
    </div>
  )
}

export default Users 