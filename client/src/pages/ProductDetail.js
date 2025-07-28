import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!response.ok) {
          throw new Error('Produto não encontrado');
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
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

  const allImages = [product.image, ...(product.additionalImages || [])].filter(Boolean);
  const discount = ((product.originalPrice - product.salePrice) / product.originalPrice * 100).toFixed(0);

  return (
    <div className="main-content">
      <div className="product-detail-container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/" className="breadcrumb-item">
            <i className="fas fa-home"></i>
            Início
          </Link>
          <span className="breadcrumb-separator">
            <i className="fas fa-chevron-right"></i>
          </span>
          <span className="breadcrumb-item active">{product.name}</span>
        </nav>

        <div className="product-detail-grid">
          {/* Galeria de Imagens */}
          <div className="product-gallery">
            <div className="main-image-container">
              {allImages.length > 0 ? (
                <img
                  src={`http://localhost:5000${allImages[currentImageIndex]}`}
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
                      src={`http://localhost:5000${image}`}
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
            <div className="product-header">
              <h1 className="product-title">{product.name}</h1>
              {product.category && (
                <span className="product-category">
                  <i className="fas fa-tag"></i>
                  {product.category}
                </span>
              )}
            </div>

            <div className="product-description">
              <h3>
                <i className="fas fa-info-circle"></i>
                Descrição
              </h3>
              <p>{product.description}</p>
            </div>

            {/* Preços */}
            <div className="product-pricing">
              <div className="price-display">
                <div className="original-price">
                  <span className="price-label">De:</span>
                  <span className="price-value">R$ {parseFloat(product.originalPrice).toFixed(2)}</span>
                </div>
                <div className="sale-price">
                  <span className="price-label">Por:</span>
                  <span className="price-value">R$ {parseFloat(product.salePrice).toFixed(2)}</span>
                </div>
                <div className="discount-badge">
                  <i className="fas fa-percentage"></i>
                  {discount}% OFF
                </div>
              </div>
            </div>

            {/* Vídeo */}
            {product.video && (
              <div className="product-video">
                <h3>
                  <i className="fas fa-video"></i>
                  Vídeo do Produto
                </h3>
                <video
                  src={`http://localhost:5000${product.video}`}
                  controls
                  className="product-video-player"
                />
              </div>
            )}

            {/* Botão de Compra */}
            <div className="product-actions">
              <a
                href={product.affiliateLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary buy-btn"
              >
                <i className="fas fa-shopping-cart"></i>
                Comprar Agora
              </a>
              
              <button className="btn btn-warning share-btn">
                <i className="fas fa-share-alt"></i>
                Compartilhar
              </button>
            </div>

            {/* Redes Sociais */}
            <div className="social-share">
              <h4>
                <i className="fas fa-share"></i>
                Compartilhar nas Redes Sociais
              </h4>
              <div className="social-buttons">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-share-btn facebook"
                >
                  <i className="fab fa-facebook"></i>
                  Facebook
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(product.name)}&url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-share-btn twitter"
                >
                  <i className="fab fa-twitter"></i>
                  Twitter
                </a>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`${product.name} - ${window.location.href}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-share-btn whatsapp"
                >
                  <i className="fab fa-whatsapp"></i>
                  WhatsApp
                </a>
                <a
                  href={`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(product.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-share-btn telegram"
                >
                  <i className="fab fa-telegram"></i>
                  Telegram
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Produtos Relacionados */}
        <div className="related-products">
          <h3>
            <i className="fas fa-th-large"></i>
            Produtos Relacionados
          </h3>
          <div className="related-products-grid">
            {/* Aqui você pode adicionar produtos relacionados */}
            <div className="related-product-card">
              <div className="related-product-placeholder">
                <i className="fas fa-plus"></i>
                <span>Mais produtos em breve</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 