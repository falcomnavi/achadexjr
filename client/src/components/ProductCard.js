import React from 'react';

const ProductCard = ({ product }) => {
  const calculateDiscount = () => {
    if (!product.originalPrice || !product.salePrice) return 0;
    return Math.round(((product.originalPrice - product.salePrice) / product.originalPrice) * 100);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  return (
    <div className="card fade-in">
      {product.image && (
        <img 
          src={`http://localhost:5000${product.image}`} 
          alt={product.name}
          className="card-img"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200?text=Sem+Imagem';
          }}
        />
      )}
      
      <div className="card-body">
        <h3 className="card-title">{product.name}</h3>
        <p className="card-text">{product.description}</p>
        
        <div className="price-container">
          <span className="original-price">
            {formatPrice(product.originalPrice)}
          </span>
          <span className="sale-price">
            {formatPrice(product.salePrice)}
          </span>
          <span className="discount-badge">
            -{calculateDiscount()}%
          </span>
        </div>
        
        <div style={{ marginTop: '1rem' }}>
          <a 
            href={product.affiliateLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ width: '100%', textAlign: 'center' }}
          >
            Ver Oferta
          </a>
        </div>
        
        {product.category && (
          <div style={{ marginTop: '0.5rem' }}>
            <small style={{ color: '#666' }}>
              Categoria: {product.category}
            </small>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard; 