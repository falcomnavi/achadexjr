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
            src={product.image} 
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
        
        {product.description && (
          <p className="card-description">
            {product.description.length > 100 
              ? `${product.description.substring(0, 100)}...` 
              : product.description
            }
          </p>
        )}
        
        <div className="card-pricing">
          {product.originalPrice && product.salePrice && (
            <div className="original-price">
              De: {formatPrice(product.originalPrice)}
            </div>
          )}
          <div className="sale-price">
            Por: {formatPrice(product.salePrice)}
          </div>
          {calculateDiscount() > 0 && (
            <div className="discount-badge">
              -{calculateDiscount()}%
            </div>
          )}
        </div>
        
        {product.category && (
          <div className="card-category">
            <i className="fas fa-tag"></i>
            {product.category}
          </div>
        )}
        
        <div className="card-actions">
          <Link to={`/product/${product.id || product._id}`} className="btn btn-primary">
            <i className="fas fa-eye"></i>
            Ver Detalhes
          </Link>
          
          <a 
            href={product.affiliateLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-success"
          >
            <i className="fas fa-external-link-alt"></i>
            Comprar
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 