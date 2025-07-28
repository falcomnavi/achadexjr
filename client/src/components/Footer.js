import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-title">
            <i className="fas fa-bolt"></i>
            Achadex Jr
          </h3>
          <p className="footer-description">
            Tecnologia e inovação para o futuro dos afiliados
          </p>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-subtitle">
            <i className="fas fa-link"></i>
            Links Rápidos
          </h4>
          <ul className="footer-links">
            <li><a href="/">Início</a></li>
            <li><a href="/admin/login">Admin</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-subtitle">
            <i className="fas fa-share-alt"></i>
            Redes Sociais
          </h4>
          <div className="footer-social">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://telegram.org" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-telegram"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-subtitle">
            <i className="fas fa-info-circle"></i>
            Contato
          </h4>
          <p className="footer-contact">
            <i className="fas fa-envelope"></i>
            contato@achadexjr.com
          </p>
          <p className="footer-contact">
            <i className="fas fa-phone"></i>
            (11) 99999-9999
          </p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2024 Achadex Jr. Todos os direitos reservados.</p>
        <p>Desenvolvido com tecnologia de ponta</p>
      </div>
    </footer>
  );
};

export default Footer; 