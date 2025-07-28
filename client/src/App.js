import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';

// Componentes
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ProductForm from './components/ProductForm';
import ProductDetail from './pages/ProductDetail';

// Configuração do axios - funciona tanto em desenvolvimento quanto em produção
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? window.location.origin 
  : 'http://localhost:5000';

axios.defaults.baseURL = API_BASE_URL;

// TESTE: Achadex Jr - Site Tecnológico Atualizado

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (success) => {
    setIsAdmin(success);
  };

  const handleLogout = () => {
    setIsAdmin(false);
  };

  const addProduct = async (productData) => {
    try {
      const formData = new FormData();
      
      // Adicionar campos de texto
      Object.keys(productData).forEach(key => {
        if (key !== 'image' && key !== 'video' && key !== 'additionalImages') {
          formData.append(key, productData[key]);
        }
      });

      // Adicionar imagem principal
      if (productData.image) {
        formData.append('image', productData.image);
      }

      // Adicionar vídeo
      if (productData.video) {
        formData.append('video', productData.video);
      }

      // Adicionar imagens adicionais
      if (productData.additionalImages && productData.additionalImages.length > 0) {
        productData.additionalImages.forEach(image => {
          formData.append('additionalImages', image);
        });
      }

      const response = await axios.post('/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setProducts([...products, response.data.product]);
        return true;
      }
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
      return false;
    }
  };

  const updateProduct = async (id, productData) => {
    try {
      const formData = new FormData();
      
      // Adicionar campos de texto
      Object.keys(productData).forEach(key => {
        if (key !== 'image' && key !== 'video' && key !== 'additionalImages') {
          formData.append(key, productData[key]);
        }
      });

      // Adicionar imagem principal
      if (productData.image) {
        formData.append('image', productData.image);
      }

      // Adicionar vídeo
      if (productData.video) {
        formData.append('video', productData.video);
      }

      // Adicionar imagens adicionais
      if (productData.additionalImages && productData.additionalImages.length > 0) {
        productData.additionalImages.forEach(image => {
          formData.append('additionalImages', image);
        });
      }

      const response = await axios.put(`/api/products/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setProducts(products.map(p => p.id === id || p._id === id ? response.data.product : p));
        return true;
      }
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      return false;
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(`/api/products/${id}`);
      if (response.data.success) {
        setProducts(products.filter(p => p.id !== id && p._id !== id));
        return true;
      }
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
      return false;
    }
  };

  const toggleProductStatus = async (id) => {
    try {
      const response = await axios.patch(`/api/products/${id}/toggle`);
      if (response.data.success) {
        setProducts(products.map(p => p.id === id || p._id === id ? response.data.product : p));
      }
    } catch (error) {
      console.error('Erro ao alternar status do produto:', error);
    }
  };

  return (
    <Router>
      <div className="App">
        <Header isAdmin={isAdmin} onLogout={handleLogout} />
        
        <main className="main-content">
          <Routes>
            <Route 
              path="/" 
              element={
                <HomePage 
                  products={products} 
                  loading={loading} 
                />
              } 
            />
            <Route 
              path="/product/:id" 
              element={
                <ProductDetail />
              } 
            />
            <Route 
              path="/admin/login" 
              element={
                isAdmin ? 
                <Navigate to="/admin" /> : 
                <AdminLogin onLogin={handleLogin} />
              } 
            />
            <Route 
              path="/admin" 
              element={
                isAdmin ? 
                <AdminDashboard 
                  products={products}
                  onAddProduct={addProduct}
                  onUpdateProduct={updateProduct}
                  onDeleteProduct={deleteProduct}
                  onToggleStatus={toggleProductStatus}
                /> : 
                <Navigate to="/admin/login" />
              } 
            />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App; 