import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ isAdmin, onLogout }) => {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          🛍️ Ofertas Afiliados
        </Link>
        
        <nav>
          <ul className="nav-links">
            <li>
              <Link to="/">Início</Link>
            </li>
            {isAdmin ? (
              <>
                <li>
                  <Link to="/admin">Painel Admin</Link>
                </li>
                <li>
                  <button 
                    onClick={onLogout}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'white',
                      cursor: 'pointer',
                      padding: '0.5rem 1rem',
                      borderRadius: '5px',
                      transition: 'background-color 0.3s'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                  >
                    Sair
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link to="/admin/login">Admin</Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header; 