# 🛍️ Site de Ofertas para Afiliados

Um site completo para gerenciar produtos em oferta de afiliados, com painel administrativo e interface moderna.

## ✨ Funcionalidades

- **Site Público**: Exibe produtos em oferta com design responsivo
- **Painel Administrativo**: Gerenciamento completo de produtos
- **Upload de Imagens**: Suporte para imagens dos produtos
- **Filtros e Busca**: Busca por nome, descrição e categoria
- **Estatísticas**: Dashboard com métricas dos produtos
- **Status Ativo/Inativo**: Controle de visibilidade dos produtos

## 🚀 Como Executar

### Pré-requisitos
- Node.js (versão 14 ou superior)
- npm ou yarn

### Instalação

1. **Clone ou baixe o projeto**
```bash
cd afiliados-site
```

2. **Instale as dependências**
```bash
npm run install-all
```

3. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

4. **Acesse o site**
- Site público: http://localhost:3000
- Painel admin: http://localhost:3000/admin/login

### Credenciais de Acesso
- **Usuário**: admin
- **Senha**: admin123

## 📁 Estrutura do Projeto

```
afiliados-site/
├── client/                 # Frontend React
│   ├── public/
│   └── src/
│       ├── components/     # Componentes reutilizáveis
│       └── pages/         # Páginas da aplicação
├── server/                 # Backend Node.js
│   ├── index.js           # Servidor principal
│   └── package.json
└── package.json           # Configuração principal
```

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React**: Framework principal
- **React Router**: Navegação
- **Axios**: Requisições HTTP
- **CSS3**: Estilização moderna

### Backend
- **Node.js**: Runtime JavaScript
- **Express**: Framework web
- **Multer**: Upload de arquivos
- **CORS**: Cross-origin requests

## 📱 Funcionalidades do Painel Admin

### Gerenciamento de Produtos
- ✅ Adicionar novos produtos
- ✅ Editar produtos existentes
- ✅ Deletar produtos
- ✅ Ativar/desativar produtos
- ✅ Upload de imagens

### Dashboard
- 📊 Estatísticas em tempo real
- 📈 Total de produtos
- 📉 Produtos ativos/inativos
- 🏷️ Número de categorias

### Interface
- 🎨 Design moderno e responsivo
- 📱 Compatível com mobile
- ⚡ Interface rápida e intuitiva
- 🔍 Filtros e busca avançada

## 🎯 Como Usar

### 1. Acesse o Painel Admin
- Vá para http://localhost:3000/admin/login
- Use as credenciais: admin / admin123

### 2. Adicione Produtos
- Clique em "Adicionar Produto"
- Preencha todas as informações:
  - Nome do produto
  - Descrição
  - Preço original
  - Preço de venda
  - Link de afiliado
  - Categoria (opcional)
  - Imagem (opcional)

### 3. Gerencie Produtos
- Visualize todos os produtos na tabela
- Edite informações clicando em "Editar"
- Ative/desative produtos conforme necessário
- Delete produtos que não são mais relevantes

### 4. Visualize o Site
- Acesse http://localhost:3000
- Veja os produtos ativos exibidos
- Use os filtros para encontrar produtos específicos

## 🔧 Configurações Avançadas

### Alterar Credenciais Admin
Edite o arquivo `server/index.js`:
```javascript
let adminCredentials = {
  username: 'seu_usuario',
  password: 'sua_senha'
};
```

### Configurar Banco de Dados
Para produção, substitua o armazenamento em memória por um banco de dados:
- MongoDB
- PostgreSQL
- MySQL

### Deploy
1. **Build do Frontend**:
```bash
cd client
npm run build
```

2. **Configurar Servidor**:
```bash
cd server
npm start
```

## 🐛 Solução de Problemas

### Erro de CORS
- Verifique se o servidor está rodando na porta 5000
- Confirme se o proxy está configurado no package.json do client

### Imagens não carregam
- Verifique se a pasta `server/public/uploads` existe
- Confirme se o servidor tem permissões de escrita

### Erro de conexão
- Verifique se ambas as portas (3000 e 5000) estão livres
- Reinicie o servidor se necessário

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique se todas as dependências estão instaladas
2. Confirme se as portas estão disponíveis
3. Verifique os logs do console para erros

## 🎉 Próximas Funcionalidades

- [ ] Sistema de usuários múltiplos
- [ ] Relatórios de performance
- [ ] Integração com APIs de afiliados
- [ ] Sistema de notificações
- [ ] Backup automático dos dados
- [ ] SEO otimizado
- [ ] PWA (Progressive Web App)

---

**Desenvolvido com ❤️ para facilitar o gerenciamento de produtos de afiliados** 