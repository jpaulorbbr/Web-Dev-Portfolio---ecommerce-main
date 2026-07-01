import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';   // ← Importante

export default function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-dark navbar-custom">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <span className="title-on-nav">Department Store</span>
        </Link>

        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarSupportedContent" 
          aria-controls="navbarSupportedContent" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>

            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Store
              </Link>
              <ul className="dropdown-menu store-menu">
                <li><Link className="dropdown-item" to="/store">Loja</Link></li>
                <li><hr className="dropdown-divider" /></li>
              </ul>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/products">Produtos</Link>
            </li>

            {/* Condicional Login / Logout */}
            {user?.isAuthenticated ? (
              <li className="nav-item">
                <Link className="nav-link" to="/logout">Logout</Link>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
              </>
            )}
          </ul>

          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success search-button" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  );
}