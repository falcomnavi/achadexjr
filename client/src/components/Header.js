import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ isAdmin, onLogout }) => {
  return (
    <header className="header-tech">
      <div className="header-content">
        <Link to="/" className="logo-tech">
          <div className="logo-icon">⚡</div>
          <span className="logo-text">Achadex Jr</span>
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
                    className="logout-btn"
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

        {/* Redes Sociais */}
        <div className="social-links">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://telegram.org" target="_blank" rel="noopener noreferrer" className="social-link">
            <i className="fab fa-telegram"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-link">
            <i className="fab fa-youtube"></i>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header; 