# 📋 Guia de Instalação - Site de Afiliados

## 🔧 Pré-requisitos

### 1. Instalar Node.js
1. Acesse: https://nodejs.org/
2. Baixe a versão LTS (recomendada)
3. Execute o instalador e siga as instruções
4. Verifique a instalação:
   ```bash
   node --version
   npm --version
   ```

### 2. Verificar Instalação
Abra o PowerShell ou CMD e digite:
```bash
node --version
npm --version
```

Se aparecer as versões, o Node.js está instalado corretamente.

## 🚀 Instalação do Projeto

### 1. Navegar para o diretório
```bash
cd C:\Users\ivangomesdasilvasodr\Desktop\afiliados-site
```

### 2. Instalar dependências do projeto principal
```bash
npm install
```

### 3. Instalar dependências do servidor
```bash
cd server
npm install
cd ..
```

### 4. Instalar dependências do cliente
```bash
cd client
npm install
cd ..
```

### 5. Iniciar o projeto
```bash
npm run dev
```

## 🌐 Acessar o Site

Após iniciar o projeto:
- **Site público**: http://localhost:3000
- **Painel admin**: http://localhost:3000/admin/login

### Credenciais de Acesso
- **Usuário**: admin
- **Senha**: admin123

## 📱 Funcionalidades Disponíveis

### Site Público (http://localhost:3000)
- ✅ Visualizar produtos em oferta
- ✅ Buscar produtos por nome/descrição
- ✅ Filtrar por categoria
- ✅ Clicar nos links de afiliado

### Painel Administrativo (http://localhost:3000/admin/login)
- ✅ Login seguro
- ✅ Adicionar novos produtos
- ✅ Editar produtos existentes
- ✅ Deletar produtos
- ✅ Ativar/desativar produtos
- ✅ Upload de imagens
- ✅ Dashboard com estatísticas

## 🛠️ Comandos Úteis

### Desenvolvimento
```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Iniciar apenas o servidor
npm run server

# Iniciar apenas o cliente
npm run client
```

### Produção
```bash
# Build do frontend
cd client
npm run build

# Iniciar servidor de produção
cd server
npm start
```

## 🐛 Solução de Problemas

### Erro: "npm não é reconhecido"
- Instale o Node.js: https://nodejs.org/
- Reinicie o terminal após a instalação

### Erro: "Porta já em uso"
- Feche outros programas que usam as portas 3000 ou 5000
- Ou altere as portas nos arquivos de configuração

### Erro: "Módulo não encontrado"
- Execute `npm install` em cada diretório (raiz, server, client)
- Verifique se o Node.js está instalado corretamente

### Erro de CORS
- Verifique se o servidor está rodando na porta 5000
- Confirme se o proxy está configurado no client

## 📞 Suporte

Se encontrar problemas:
1. Verifique se o Node.js está instalado
2. Confirme se todas as dependências foram instaladas
3. Verifique se as portas estão livres
4. Consulte os logs de erro no terminal

## 🎯 Próximos Passos

Após a instalação:
1. Acesse o painel admin
2. Adicione seus primeiros produtos
3. Personalize as informações
4. Compartilhe o site com seus clientes

---

**🎉 Parabéns! Seu site de afiliados está pronto para uso!** 