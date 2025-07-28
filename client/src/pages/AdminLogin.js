import React, { useState } from 'react';
import axios from 'axios';

const AdminLogin = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/login', credentials);
      
      if (response.data.success) {
        onLogin(true);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError('Erro ao fazer login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>🔐 Login Administrativo</h2>
      <p style={{ marginBottom: '2rem', color: '#666' }}>
        Acesse o painel de administração para gerenciar os produtos.
      </p>

      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Usuário</label>
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            className="form-input"
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Senha</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            className="form-input"
            required
            disabled={loading}
          />
        </div>

        <button 
          type="submit" 
          className="btn btn-primary"
          style={{ width: '100%' }}
          disabled={loading}
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>

      <div style={{ marginTop: '2rem', padding: '1rem', background: '#f8f9fa', borderRadius: '5px' }}>
        <h4>Credenciais de Teste:</h4>
        <p><strong>Usuário:</strong> admin</p>
        <p><strong>Senha:</strong> admin123</p>
      </div>
    </div>
  );
};

export default AdminLogin; 