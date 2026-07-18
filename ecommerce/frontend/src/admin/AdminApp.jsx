import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AdminDashboard from './pages/Dashboard'
import Users from './pages/Users'
import StaffUsers from './pages/StaffUsers'
import Products from './pages/Products'
import Profile from './pages/Profile'

function AdminApp() {
  return (
    <Router basename="/admin">
      <Routes>
        <Route element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="users" element={<Users />} />
          <Route path="staff" element={<StaffUsers />} />  
          <Route path="products" element={<Products />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default AdminApp