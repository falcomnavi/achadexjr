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
        <h2>Carregando produtos...</h2>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1>🛍️ Ofertas Especiais</h1>
        <p>Descubra os melhores produtos em oferta selecionados para você!</p>
      </div>

      {/* Filtros */}
      <div style={{ 
        background: 'white', 
        padding: '1.5rem', 
        borderRadius: '10px', 
        marginBottom: '2rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label className="form-label">Buscar produtos:</label>
            <input
              type="text"
              placeholder="Digite o nome ou descrição..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="form-input"
            />
          </div>
          
          <div>
            <label className="form-label">Categoria:</label>
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
        <div style={{ 
          textAlign: 'center', 
          padding: '3rem',
          background: 'white',
          borderRadius: '10px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h3>Nenhum produto encontrado</h3>
          <p>Tente ajustar os filtros ou adicione novos produtos.</p>
        </div>
      ) : (
        <>
          <div style={{ marginBottom: '1rem' }}>
            <p><strong>{filteredProducts.length}</strong> produto(s) encontrado(s)</p>
          </div>
          
          <div className="products-grid">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage; 