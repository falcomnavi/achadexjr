import React, { useState, useEffect } from 'react';

const ProductForm = ({ product, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    originalPrice: '',
    salePrice: '',
    affiliateLink: '',
    category: '',
    image: null,
    video: null,
    additionalImages: []
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [previewVideo, setPreviewVideo] = useState(null);
  const [previewAdditionalImages, setPreviewAdditionalImages] = useState([]);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        originalPrice: product.originalPrice || '',
        salePrice: product.salePrice || '',
        affiliateLink: product.affiliateLink || '',
        category: product.category || '',
        image: null,
        video: null,
        additionalImages: []
      });
      if (product.image) {
        setPreviewImage(`http://localhost:5000${product.image}`);
      }
      if (product.video) {
        setPreviewVideo(`http://localhost:5000${product.video}`);
      }
      if (product.additionalImages) {
        setPreviewAdditionalImages(product.additionalImages.map(img => `http://localhost:5000${img}`));
      }
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === 'image' && files[0]) {
      setFormData(prev => ({ ...prev, image: files[0] }));
      setPreviewImage(URL.createObjectURL(files[0]));
    } else if (name === 'video' && files[0]) {
      setFormData(prev => ({ ...prev, video: files[0] }));
      setPreviewVideo(URL.createObjectURL(files[0]));
    } else if (name === 'additionalImages' && files.length > 0) {
      const newImages = Array.from(files);
      setFormData(prev => ({ ...prev, additionalImages: [...prev.additionalImages, ...newImages] }));
      
      const newPreviews = newImages.map(file => URL.createObjectURL(file));
      setPreviewAdditionalImages(prev => [...prev, ...newPreviews]);
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const removeAdditionalImage = (index) => {
    setFormData(prev => ({
      ...prev,
      additionalImages: prev.additionalImages.filter((_, i) => i !== index)
    }));
    setPreviewAdditionalImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="form-container">
      <h2 className="form-title">
        <i className="fas fa-cube"></i>
        {product ? 'Editar Produto' : 'Adicionar Novo Produto'}
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">
            <i className="fas fa-tag"></i> Nome do Produto *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
            placeholder="Digite o nome do produto"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            <i className="fas fa-align-left"></i> Descrição *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-input form-textarea"
            placeholder="Descreva o produto detalhadamente..."
            required
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">
              <i className="fas fa-dollar-sign"></i> Preço Original *
            </label>
            <input
              type="number"
              name="originalPrice"
              value={formData.originalPrice}
              onChange={handleChange}
              className="form-input"
              step="0.01"
              min="0"
              placeholder="0.00"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <i className="fas fa-percentage"></i> Preço de Venda *
            </label>
            <input
              type="number"
              name="salePrice"
              value={formData.salePrice}
              onChange={handleChange}
              className="form-input"
              step="0.01"
              min="0"
              placeholder="0.00"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">
            <i className="fas fa-link"></i> Link de Afiliado *
          </label>
          <input
            type="url"
            name="affiliateLink"
            value={formData.affiliateLink}
            onChange={handleChange}
            className="form-input"
            placeholder="https://exemplo.com/produto"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            <i className="fas fa-folder"></i> Categoria
          </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="form-input"
            placeholder="Ex: Eletrônicos, Moda, Casa..."
          />
        </div>

        {/* Imagem Principal */}
        <div className="form-group">
          <label className="form-label">
            <i className="fas fa-image"></i> Imagem Principal
          </label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="form-input"
            accept="image/*"
          />
          {previewImage && (
            <div className="preview-container">
              <img 
                src={previewImage} 
                alt="Preview" 
                className="preview-image"
              />
            </div>
          )}
        </div>

        {/* Vídeo */}
        <div className="form-group">
          <label className="form-label">
            <i className="fas fa-video"></i> Vídeo do Produto
          </label>
          <input
            type="file"
            name="video"
            onChange={handleChange}
            className="form-input"
            accept="video/*"
          />
          {previewVideo && (
            <div className="preview-container">
              <video 
                src={previewVideo} 
                controls
                className="preview-video"
              />
            </div>
          )}
        </div>

        {/* Imagens Adicionais */}
        <div className="form-group">
          <label className="form-label">
            <i className="fas fa-images"></i> Imagens Adicionais
          </label>
          <input
            type="file"
            name="additionalImages"
            onChange={handleChange}
            className="form-input"
            accept="image/*"
            multiple
          />
          {previewAdditionalImages.length > 0 && (
            <div className="additional-images-grid">
              {previewAdditionalImages.map((preview, index) => (
                <div key={index} className="additional-image-container">
                  <img 
                    src={preview} 
                    alt={`Preview ${index + 1}`} 
                    className="preview-image"
                  />
                  <button
                    type="button"
                    onClick={() => removeAdditionalImage(index)}
                    className="remove-image-btn"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
          <button type="submit" className="btn btn-success">
            <i className="fas fa-save"></i>
            {product ? 'Atualizar Produto' : 'Adicionar Produto'}
          </button>
          <button 
            type="button" 
            onClick={onCancel}
            className="btn btn-warning"
          >
            <i className="fas fa-times"></i>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm; 