import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';

const HomePage = ({ products, loading }) => {
  const [filter, setFilter] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = [...new Set(products.map(p => p.category).filter(Boolean))];

  const filteredProducts = products.filter(product => {
    const matchesFilter = product.name.toLowerCase().includes(filter.toLowerCase()) ||
                         product.description.toLowerCase().includes(filter.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return product.active && matchesFilter && matchesCategory;
  });

  if (loading) {
    return (
      <div className="loading">
        <i className="fas fa-spinner fa-spin"></i>
        <span style={{ marginLeft: '1rem' }}>Carregando produtos...</span>
      </div>
    );
  }

  return (
    <div className="fade-in">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            <i className="fas fa-bolt"></i>
            Achadex Jr
          </h1>
          <p className="hero-subtitle">
            Tecnologia e inovação para o futuro dos afiliados
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <i className="fas fa-cube"></i>
              <span>{products.filter(p => p.active).length} Produtos</span>
            </div>
            <div className="stat-item">
              <i className="fas fa-tags"></i>
              <span>{categories.length} Categorias</span>
            </div>
            <div className="stat-item">
              <i className="fas fa-fire"></i>
              <span>Ofertas Quentes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="filters-container">
        <div className="filters-grid">
          <div className="filter-group">
            <label className="form-label">
              <i className="fas fa-search"></i>
              Buscar produtos:
            </label>
            <input
              type="text"
              placeholder="Digite o nome ou descrição..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="form-input"
            />
          </div>
          
          <div className="filter-group">
            <label className="form-label">
              <i className="fas fa-filter"></i>
              Categoria:
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="form-input"
            >
              <option value="">Todas as categorias</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Resultados */}
      {filteredProducts.length === 0 ? (
        <div className="no-products">
          <div className="no-products-content">
            <i className="fas fa-search"></i>
            <h3>Nenhum produto encontrado</h3>
            <p>Tente ajustar os filtros ou adicione novos produtos.</p>
          </div>
        </div>
      ) : (
        <>
          <div className="results-header">
            <div className="results-count">
              <i className="fas fa-list"></i>
              <span><strong>{filteredProducts.length}</strong> produto(s) encontrado(s)</span>
            </div>
            <div className="results-sort">
              <i className="fas fa-sort"></i>
              <span>Ordenar por relevância</span>
            </div>
          </div>
          
          <div className="products-grid">
            {filteredProducts.map(product => (
              <ProductCard key={product.id || product._id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage; 