# 🚀 Deploy no Railway - Achadex Jr (CORRIGIDO)

## ✅ **PROBLEMAS CORRIGIDOS:**

### 1. **Servidor Duplicado Removido**
- ❌ Removido `server/index.js` duplicado
- ✅ Mantido apenas `api/index.js` como servidor principal

### 2. **URLs Hardcoded Corrigidas**
- ❌ `http://localhost:5000` removido de todos os arquivos
- ✅ URLs dinâmicas que funcionam em desenvolvimento e produção

### 3. **Configuração do Railway**
- ✅ `railway.json` criado
- ✅ `railway.toml` criado
- ✅ `package.json` atualizado com engines corretas

### 4. **Proxy Removido**
- ❌ Removido proxy do `client/package.json`
- ✅ URLs configuradas dinamicamente

## 🚀 **PASSOS PARA DEPLOY NO RAILWAY:**

### **1. Acesse o Railway**
- Vá para: https://railway.app
- Faça login com GitHub

### **2. Conecte o Repositório**
1. Clique em "Start a New Project"
2. Selecione "Deploy from GitHub repo"
3. Escolha seu repositório `afiliados-site`

### **3. Configuração Automática**
O Railway detectará automaticamente:
- ✅ **Root Directory**: `.` (raiz do projeto)
- ✅ **Build Command**: `npm install`
- ✅ **Start Command**: `npm start`
- ✅ **Node.js Version**: 18.x

### **4. Variáveis de Ambiente (Opcional)**
O Railway detecta automaticamente, mas você pode adicionar:
```
NODE_ENV=production
PORT=5000
```

### **5. Deploy**
- O Railway fará deploy automático
- URL será: `https://seu-projeto.railway.app`

## 🔧 **ARQUIVOS CORRIGIDOS:**

### **package.json (Principal)**
```json
{
  "scripts": {
    "start": "node api/index.js",
    "postinstall": "cd client && npm run build"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

### **client/src/App.js**
```javascript
// Configuração dinâmica do axios
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? window.location.origin 
  : 'http://localhost:5000';

axios.defaults.baseURL = API_BASE_URL;
```

### **Arquivos de Configuração**
- ✅ `railway.json` - Configuração JSON
- ✅ `railway.toml` - Configuração TOML
- ✅ `.gitignore` - Arquivos ignorados

## 🎯 **RESULTADO ESPERADO:**

### **URLs que Funcionam:**
- ✅ `https://seu-projeto.railway.app` - Site principal
- ✅ `https://seu-projeto.railway.app/api/products` - API
- ✅ `https://seu-projeto.railway.app/admin/login` - Admin

### **Funcionalidades:**
- ✅ Listagem de produtos
- ✅ Detalhes do produto
- ✅ Upload de imagens/vídeos
- ✅ Painel administrativo
- ✅ Links de afiliados

## 🚨 **IMPORTANTE:**

### **Credenciais do Admin:**
- **Usuário**: `admin`
- **Senha**: `admin123`

### **Estrutura Final:**
```
afiliados-site/
├── api/index.js          # Servidor principal
├── client/               # Frontend React
├── package.json          # Configuração principal
├── railway.json          # Config Railway
├── railway.toml          # Config Railway
└── README.md
```

## 🎉 **PRONTO PARA DEPLOY!**

Seu projeto está **100% corrigido** e pronto para deploy no Railway!

**Próximos passos:**
1. Faça push para GitHub
2. Conecte no Railway
3. Deploy automático acontece
4. Site funcionando! 🚀 