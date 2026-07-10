import { useState, useEffect } from 'react'
import axios from 'axios'

function StaffUsers() {
  const [staffUsers, setStaffUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    console.log("Iniciando fetch de Staff Users...")

    axios.get('/admin/api/users/', { withCredentials: true })
      .then(res => {
        console.log("Staff recebidos:", res.data.length, "registros")
        const staff = res.data.filter(user => user.admin_staff || user.is_superuser)
        setStaffUsers(staff)
      })
      .catch(err => {
        console.error("Erro completo ao carregar staff:", err)
        setError(err.response?.data?.detail || "Erro ao carregar equipe. Verifique se você está logado como admin.")
      })
      .finally(() => setLoading(false))
  }, [])

  const filteredStaff = staffUsers.filter(user =>
    user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) return <div className="text-center mt-5"><h4>Carregando equipe administrativa...</h4></div>
  if (error) return <div className="alert alert-danger mt-4">{error}</div>

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>👮‍♂️ Gerenciar Staff / Administradores</h3>
        <a href="/admin/register/" className="btn btn-success">+ Adicionar Membro</a>
      </div>

      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="🔍 Buscar staff..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="card shadow-sm">
        <table className="table table-hover mb-0">
          <thead className="table-dark">
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Cargo</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredStaff.map(user => (
              <tr key={user.id}>
                <td><strong>{user.username}</strong></td>
                <td>{user.email}</td>
                <td>
                  {user.is_superuser ? (
                    <span className="badge bg-danger">Superuser</span>
                  ) : (
                    <span className="badge bg-primary">Staff</span>
                  )}
                </td>
                <td>
                  <a href={`/admin/users/staff/${user.username}`} className="btn btn-sm btn-primary me-2">
                    Ver Detalhes
                  </a>
                  <button className="btn btn-sm btn-warning">Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredStaff.length === 0 && (
        <p className="text-center text-muted mt-4">Nenhum membro da equipe encontrado.</p>
      )}
    </div>
  )
}

export default StaffUsers