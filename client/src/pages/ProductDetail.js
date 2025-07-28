import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError('Produto não encontrado');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="main-content">
        <div className="loading">
          <i className="fas fa-spinner fa-spin"></i>
          <span style={{ marginLeft: '1rem' }}>Carregando produto...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="main-content">
        <div className="alert alert-error">
          <i className="fas fa-exclamation-triangle"></i>
          {error}
        </div>
        <Link to="/" className="btn btn-primary">
          <i className="fas fa-arrow-left"></i>
          Voltar ao Início
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="main-content">
        <div className="alert alert-error">
          <i className="fas fa-exclamation-triangle"></i>
          Produto não encontrado
        </div>
        <Link to="/" className="btn btn-primary">
          <i className="fas fa-arrow-left"></i>
          Voltar ao Início
        </Link>
      </div>
    );
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const calculateDiscount = () => {
    if (!product.originalPrice || !product.salePrice) return 0;
    return Math.round(((product.originalPrice - product.salePrice) / product.originalPrice) * 100);
  };

  const allImages = [
    ...(product.image ? [product.image] : []),
    ...(product.additionalImages || [])
  ];

  return (
    <div className="main-content">
      <div className="product-detail-container">
        <div className="product-header">
          <Link to="/" className="back-link">
            <i className="fas fa-arrow-left"></i>
            Voltar aos Produtos
          </Link>
          <h1 className="product-title">{product.name}</h1>
        </div>

        <div className="product-content">
          {/* Galeria de Imagens */}
          <div className="product-gallery">
            <div className="main-image-container">
              {allImages.length > 0 ? (
                <img
                  src={allImages[currentImageIndex]}
                  alt={product.name}
                  className="main-product-image"
                />
              ) : (
                <div className="no-image-placeholder">
                  <i className="fas fa-image"></i>
                  <span>Sem imagem</span>
                </div>
              )}
            </div>

            {allImages.length > 1 && (
              <div className="thumbnail-gallery">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`thumbnail-btn ${currentImageIndex === index ? 'active' : ''}`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="thumbnail-image"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Informações do Produto */}
          <div className="product-info">
            <div className="product-description">
              <h3>Descrição</h3>
              <p>{product.description}</p>
            </div>

            <div className="product-pricing">
              <h3>Preços</h3>
              <div className="price-container">
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
            </div>

            {product.video && (
              <div className="product-video">
                <h3>Vídeo do Produto</h3>
                <video controls className="product-video-player">
                  <source src={product.video} type="video/mp4" />
                  Seu navegador não suporta vídeos.
                </video>
              </div>
            )}

            <div className="product-actions">
              <a 
                href={product.affiliateLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-primary btn-large"
              >
                <i className="fas fa-external-link-alt"></i>
                Ver Produto
              </a>
            </div>

            <div className="product-meta">
              <div className="meta-item">
                <i className="fas fa-tag"></i>
                <span>Categoria: {product.category}</span>
              </div>
              <div className="meta-item">
                <i className="fas fa-calendar"></i>
                <span>Adicionado em: {new Date(product.createdAt).toLocaleDateString('pt-BR')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 