# 🚀 Deploy do Backend no Render - Achadex Jr

## 📋 **Passo a Passo Completo**

### **1. Preparação**
```bash
# Navegar para o projeto
cd "C:\Users\ivangomesdasilvasodr\Desktop\afiliados-site"

# Instalar dependências do servidor
cd server
npm install
```

### **2. Deploy no Render**

#### **Opção A: Interface Web (Mais Fácil)**
1. **Acesse**: https://render.com
2. **Clique em**: "Sign up" (gratuito)
3. **Faça login** com Google/GitHub
4. **Clique em**: "New +" → "Web Service"
5. **Conecte GitHub** (se tiver) ou use "Deploy from existing repository"
6. **Configure**:
   - **Name**: `achadexjr-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Root Directory**: `server`

#### **Opção B: Deploy Manual**
1. **Faça upload** da pasta `server` para o Render
2. **Configure** as mesmas opções acima

### **3. Configuração do CORS**
O backend já está configurado para aceitar requisições do frontend.

### **4. URL do Backend**
Após o deploy, você receberá uma URL como:
- `https://achadexjr-backend.onrender.com`

### **5. Atualizar Frontend**
Depois de ter a URL do backend, atualize o frontend para usar a nova URL.

## 🎯 **Vantagens do Render**
- ✅ **Gratuito** para projetos pequenos
- ✅ **Deploy automático**
- ✅ **SSL gratuito**
- ✅ **Interface simples**
- ✅ **Suporte a Node.js**

## 🔧 **Troubleshooting**
- Se der erro, verifique os logs no Render
- Certifique-se de que todas as dependências estão no `package.json`
- O comando `npm start` deve funcionar localmente primeiro

## 🎉 **Resultado**
- **Frontend**: https://achadexjr-dtumehq0p-falcomnavis-projects.vercel.app
- **Backend**: https://achadexjr-backend.onrender.com

**Render é uma das melhores opções gratuitas para backend!** 🚀 