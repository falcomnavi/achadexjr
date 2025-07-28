const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Configuração do Multer para upload de imagens e vídeos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'public/uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Apenas imagens e vídeos são permitidos!'), false);
    }
  }
});

// Armazenamento temporário dos produtos (em produção, use um banco de dados)
let products = [];
let adminCredentials = {
  username: 'admin',
  password: 'admin123' // Em produção, use hash da senha
};

// Rotas da API

// Login do admin
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  
  if (username === adminCredentials.username && password === adminCredentials.password) {
    res.json({ success: true, message: 'Login realizado com sucesso!' });
  } else {
    res.status(401).json({ success: false, message: 'Credenciais inválidas!' });
  }
});

// Obter todos os produtos
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Obter produto específico
app.get('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const product = products.find(p => p.id === id || p._id === id);
  
  if (!product) {
    return res.status(404).json({ success: false, message: 'Produto não encontrado!' });
  }
  
  res.json(product);
});

// Adicionar novo produto
app.post('/api/products', upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'video', maxCount: 1 },
  { name: 'additionalImages', maxCount: 10 }
]), (req, res) => {
  try {
    const { name, description, originalPrice, salePrice, affiliateLink, category } = req.body;
    
    const newProduct = {
      _id: Date.now().toString(),
      id: Date.now().toString(),
      name,
      description,
      originalPrice: parseFloat(originalPrice),
      salePrice: parseFloat(salePrice),
      affiliateLink,
      category,
      image: req.files.image ? `/uploads/${req.files.image[0].filename}` : null,
      video: req.files.video ? `/uploads/${req.files.video[0].filename}` : null,
      additionalImages: req.files.additionalImages ? req.files.additionalImages.map(file => `/uploads/${file.filename}`) : [],
      createdAt: new Date().toISOString(),
      active: true
    };
    
    products.push(newProduct);
    res.json({ success: true, product: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Atualizar produto
app.put('/api/products/:id', upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'video', maxCount: 1 },
  { name: 'additionalImages', maxCount: 10 }
]), (req, res) => {
  try {
    const { id } = req.params;
    const productIndex = products.findIndex(p => p.id === id || p._id === id);
    
    if (productIndex === -1) {
      return res.status(404).json({ success: false, message: 'Produto não encontrado!' });
    }
    
    const updatedProduct = {
      ...products[productIndex],
      ...req.body,
      id: products[productIndex].id,
      _id: products[productIndex]._id,
      originalPrice: parseFloat(req.body.originalPrice),
      salePrice: parseFloat(req.body.salePrice)
    };
    
    if (req.files.image) {
      updatedProduct.image = `/uploads/${req.files.image[0].filename}`;
    }
    
    if (req.files.video) {
      updatedProduct.video = `/uploads/${req.files.video[0].filename}`;
    }
    
    if (req.files.additionalImages) {
      updatedProduct.additionalImages = req.files.additionalImages.map(file => `/uploads/${file.filename}`);
    }
    
    products[productIndex] = updatedProduct;
    res.json({ success: true, product: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Deletar produto
app.delete('/api/products/:id', (req, res) => {
  try {
    const { id } = req.params;
    const productIndex = products.findIndex(p => p.id === id || p._id === id);
    
    if (productIndex === -1) {
      return res.status(404).json({ success: false, message: 'Produto não encontrado!' });
    }
    
    products.splice(productIndex, 1);
    res.json({ success: true, message: 'Produto deletado com sucesso!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Alternar status ativo/inativo do produto
app.patch('/api/products/:id/toggle', (req, res) => {
  try {
    const { id } = req.params;
    const product = products.find(p => p.id === id || p._id === id);
    
    if (!product) {
      return res.status(404).json({ success: false, message: 'Produto não encontrado!' });
    }
    
    product.active = !product.active;
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Obter estatísticas
app.get('/api/stats', (req, res) => {
  const stats = {
    totalProducts: products.length,
    activeProducts: products.filter(p => p.active).length,
    inactiveProducts: products.filter(p => !p.active).length,
    categories: [...new Set(products.map(p => p.category))].length
  };
  
  res.json(stats);
});

// Servir arquivos estáticos do build do React
app.use(express.static(path.join(__dirname, '../client/build')));

// Rota para servir o frontend (deve vir depois das rotas da API)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Acesse: http://localhost:${PORT}`);
});

module.exports = app; 