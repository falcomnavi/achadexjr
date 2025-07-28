import React from 'react';
import { Link } from 'react-router-dom';

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
    <div className="card fade-in product-card-tech">
      {product.image && (
        <div className="card-image-container">
          <img 
            src={`http://localhost:5000${product.image}`} 
            alt={product.name}
            className="card-img"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x200?text=Sem+Imagem';
            }}
          />
          {product.video && (
            <div className="video-indicator">
              <i className="fas fa-video"></i>
            </div>
          )}
          {product.additionalImages && product.additionalImages.length > 0 && (
            <div className="images-indicator">
              <i className="fas fa-images"></i>
              <span>+{product.additionalImages.length}</span>
            </div>
          )}
        </div>
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
            <i className="fas fa-percentage"></i>
            -{calculateDiscount()}%
          </span>
        </div>
        
        <div className="card-actions">
          <Link 
            to={`/product/${product._id}`}
            className="btn btn-primary view-details-btn"
          >
            <i className="fas fa-eye"></i>
            Ver Detalhes
          </Link>
          
          <a 
            href={product.affiliateLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-success buy-now-btn"
          >
            <i className="fas fa-shopping-cart"></i>
            Comprar Agora
          </a>
        </div>
        
        {product.category && (
          <div className="product-category">
            <i className="fas fa-tag"></i>
            <span>{product.category}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard; 