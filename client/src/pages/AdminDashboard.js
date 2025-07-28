import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductForm from '../components/ProductForm';

const AdminDashboard = ({ 
  products, 
  onAddProduct, 
  onUpdateProduct, 
  onDeleteProduct, 
  onToggleStatus 
}) => {
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [stats, setStats] = useState({
    totalProducts: 0,
    activeProducts: 0,
    inactiveProducts: 0,
    categories: 0
  });

  useEffect(() => {
    fetchStats();
  }, [products]);

  const fetchStats = async () => {
    try {
      const response = await axios.get('/api/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
    }
  };

  const handleAddProduct = async (productData) => {
    const success = await onAddProduct(productData);
    if (success) {
      setShowForm(false);
    }
  };

  const handleUpdateProduct = async (productData) => {
    const success = await onUpdateProduct(editingProduct.id, productData);
    if (success) {
      setShowForm(false);
      setEditingProduct(null);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar este produto?')) {
      await onDeleteProduct(id);
    }
  };

  const handleToggleStatus = async (id) => {
    await onToggleStatus(id);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  return (
    <div className="fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>📊 Painel Administrativo</h1>
        <button 
          onClick={() => setShowForm(true)}
          className="btn btn-success"
        >
          ➕ Adicionar Produto
        </button>
      </div>

      {/* Estatísticas */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{stats.totalProducts}</div>
          <div className="stat-label">Total de Produtos</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.activeProducts}</div>
          <div className="stat-label">Produtos Ativos</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.inactiveProducts}</div>
          <div className="stat-label">Produtos Inativos</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.categories}</div>
          <div className="stat-label">Categorias</div>
        </div>
      </div>

      {/* Formulário */}
      {showForm && (
        <div style={{ marginBottom: '2rem' }}>
          <ProductForm
            product={editingProduct}
            onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
            onCancel={() => {
              setShowForm(false);
              setEditingProduct(null);
            }}
          />
        </div>
      )}

      {/* Tabela de Produtos */}
      <div style={{ background: 'white', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h3 style={{ padding: '1rem', margin: 0, borderBottom: '1px solid #eee' }}>
          Gerenciar Produtos ({products.length})
        </h3>
        
        {products.length === 0 ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
            <p>Nenhum produto cadastrado ainda.</p>
            <button 
              onClick={() => setShowForm(true)}
              className="btn btn-primary"
            >
              Adicionar Primeiro Produto
            </button>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="products-table">
              <thead>
                <tr>
                  <th>Imagem</th>
                  <th>Nome</th>
                  <th>Categoria</th>
                  <th>Preços</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id}>
                    <td>
                      {product.image ? (
                        <img 
                          src={`http://localhost:5000${product.image}`}
                          alt={product.name}
                          style={{ 
                            width: '50px', 
                            height: '50px', 
                            objectFit: 'cover',
                            borderRadius: '5px'
                          }}
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/50x50?text=Sem+Imagem';
                          }}
                        />
                      ) : (
                        <div style={{ 
                          width: '50px', 
                          height: '50px', 
                          background: '#f8f9fa',
                          borderRadius: '5px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.8rem',
                          color: '#666'
                        }}>
                          Sem img
                        </div>
                      )}
                    </td>
                    <td>
                      <div>
                        <strong>{product.name}</strong>
                        <br />
                        <small style={{ color: '#666' }}>
                          {product.description.substring(0, 50)}...
                        </small>
                      </div>
                    </td>
                    <td>{product.category || '-'}</td>
                    <td>
                      <div>
                        <div style={{ textDecoration: 'line-through', color: '#999' }}>
                          {formatPrice(product.originalPrice)}
                        </div>
                        <div style={{ color: '#e74c3c', fontWeight: 'bold' }}>
                          {formatPrice(product.salePrice)}
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`status-badge ${product.active ? 'status-active' : 'status-inactive'}`}>
                        {product.active ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button 
                          onClick={() => handleEdit(product)}
                          className="btn btn-primary"
                          style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}
                        >
                          ✏️ Editar
                        </button>
                        <button 
                          onClick={() => handleToggleStatus(product.id)}
                          className={`btn ${product.active ? 'btn-warning' : 'btn-success'}`}
                          style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}
                        >
                          {product.active ? '⏸️ Pausar' : '▶️ Ativar'}
                        </button>
                        <button 
                          onClick={() => handleDelete(product.id)}
                          className="btn btn-danger"
                          style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}
                        >
                          🗑️ Deletar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard; 