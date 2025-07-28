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
        setPreviewImage(product.image);
      }
      if (product.video) {
        setPreviewVideo(product.video);
      }
      if (product.additionalImages) {
        setPreviewAdditionalImages(product.additionalImages);
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
    <div className="product-form-container">
      <h2>{product ? 'Editar Produto' : 'Adicionar Novo Produto'}</h2>
      
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label htmlFor="name">Nome do Produto *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Descrição</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="form-control"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="originalPrice">Preço Original</label>
            <input
              type="number"
              id="originalPrice"
              name="originalPrice"
              value={formData.originalPrice}
              onChange={handleChange}
              step="0.01"
              min="0"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="salePrice">Preço de Venda *</label>
            <input
              type="number"
              id="salePrice"
              name="salePrice"
              value={formData.salePrice}
              onChange={handleChange}
              step="0.01"
              min="0"
              required
              className="form-control"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="affiliateLink">Link de Afiliado *</label>
          <input
            type="url"
            id="affiliateLink"
            name="affiliateLink"
            value={formData.affiliateLink}
            onChange={handleChange}
            required
            className="form-control"
            placeholder="https://..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Categoria</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Imagem Principal</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
            accept="image/*"
            className="form-control"
          />
          {previewImage && (
            <div className="image-preview">
              <img src={previewImage} alt="Preview" />
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="video">Vídeo do Produto</label>
          <input
            type="file"
            id="video"
            name="video"
            onChange={handleChange}
            accept="video/*"
            className="form-control"
          />
          {previewVideo && (
            <div className="video-preview">
              <video controls>
                <source src={previewVideo} />
              </video>
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="additionalImages">Imagens Adicionais</label>
          <input
            type="file"
            id="additionalImages"
            name="additionalImages"
            onChange={handleChange}
            accept="image/*"
            multiple
            className="form-control"
          />
          {previewAdditionalImages.length > 0 && (
            <div className="additional-images-preview">
              {previewAdditionalImages.map((preview, index) => (
                <div key={index} className="additional-image-preview">
                  <img src={preview} alt={`Preview ${index + 1}`} />
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

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            <i className="fas fa-save"></i>
            {product ? 'Atualizar Produto' : 'Adicionar Produto'}
          </button>
          <button type="button" onClick={onCancel} className="btn btn-secondary">
            <i className="fas fa-times"></i>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm; 