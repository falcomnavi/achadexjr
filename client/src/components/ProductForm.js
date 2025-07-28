import React, { useState, useEffect } from 'react';

const ProductForm = ({ product, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    originalPrice: '',
    salePrice: '',
    affiliateLink: '',
    category: '',
    image: null
  });

  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        originalPrice: product.originalPrice || '',
        salePrice: product.salePrice || '',
        affiliateLink: product.affiliateLink || '',
        category: product.category || '',
        image: null
      });
      if (product.image) {
        setPreviewImage(`http://localhost:5000${product.image}`);
      }
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === 'image' && files[0]) {
      setFormData(prev => ({ ...prev, image: files[0] }));
      setPreviewImage(URL.createObjectURL(files[0]));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="form-container">
      <h2>{product ? 'Editar Produto' : 'Adicionar Novo Produto'}</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Nome do Produto *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Descrição *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-input form-textarea"
            required
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Preço Original *</label>
            <input
              type="number"
              name="originalPrice"
              value={formData.originalPrice}
              onChange={handleChange}
              className="form-input"
              step="0.01"
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Preço de Venda *</label>
            <input
              type="number"
              name="salePrice"
              value={formData.salePrice}
              onChange={handleChange}
              className="form-input"
              step="0.01"
              min="0"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Link de Afiliado *</label>
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
          <label className="form-label">Categoria</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="form-input"
            placeholder="Ex: Eletrônicos, Moda, Casa..."
          />
        </div>

        <div className="form-group">
          <label className="form-label">Imagem do Produto</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="form-input"
            accept="image/*"
          />
          {previewImage && (
            <div style={{ marginTop: '1rem' }}>
              <img 
                src={previewImage} 
                alt="Preview" 
                style={{ 
                  maxWidth: '200px', 
                  maxHeight: '200px', 
                  objectFit: 'cover',
                  borderRadius: '5px'
                }} 
              />
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
          <button type="submit" className="btn btn-success">
            {product ? 'Atualizar Produto' : 'Adicionar Produto'}
          </button>
          <button 
            type="button" 
            onClick={onCancel}
            className="btn btn-warning"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm; 