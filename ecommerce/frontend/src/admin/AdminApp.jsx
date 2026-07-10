import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AdminDashboard from './pages/Dashboard'
import Users from './pages/Users'
import StaffUsers from './pages/StaffUsers'
import Products from './pages/Products'

function AdminApp() {
  return (
    <Router basename="/admin">
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/staff" element={<StaffUsers />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </Router>
  )
}

export default AdminApp