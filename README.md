# CRUD de Produtos - React, TypeScript e API Externa

## Descrição

Este é um projeto de CRUD (Create, Read, Update, Delete) desenvolvido em React com TypeScript, que interage com uma API externa para gerenciar produtos. O sistema realiza automaticamente a autenticação via email e senha ao se conectar com a API.

As principais funcionalidades incluem:
- Listagem de produtos
- Inserção de novos produtos
- Atualização de produtos existentes
- Exclusão de produtos

O projeto utiliza **SCSS** e **Bootstrap** para estilização e **Axios** para a comunicação com a API.

## Tecnologias Utilizadas

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [SCSS](https://sass-lang.com/)
- [Bootstrap](https://getbootstrap.com/)
- [Axios](https://axios-http.com/)

## Como Executar o Projeto

### 1. Clonar o Repositório
```bash
git clone https://github.com/LuisFelipe-Oliveira/crud-react
cd crud-react
```

### 2. Instalar Dependências
```bash
npm install
# ou
yarn install
```

### 3. Configurar a API
A API utilizada exige autenticação com email e senha. O login é realizado automaticamente no código. Se necessário, edite o arquivo responsável pela requisição de login para inserir suas credenciais.

### 4. Executar o Projeto
```bash
npm start
# ou
yarn start
```
A aplicação estará disponível em [http://localhost:3000](http://localhost:3000/).

## Uso da API

O projeto consome uma API para gerenciar produtos. Abaixo estão os endpoints utilizados:

- **Listar produtos:** `POST /product`
- **Buscar produto pelo ID:** `GET /product/read?id=1`
- **Criar produto:** `POST /product`
- **Atualizar produto:** `PUT /product/update`
- **Excluir produto:** `DELETE /product/delete`

O login é feito automaticamente no código ao iniciar a aplicação, sem necessidade de interação manual.

## Estrutura do Projeto

```
/
├── src/
│   ├── components/  # Componentes reutilizáveis
│   ├── pages/       # Páginas principais
│   ├── services/    # Configuração da API (Axios)
│   ├── styles/      # Arquivos SCSS
│   ├── Router.tsx   # Arquivo de configuração de rotas
│   ├── core/        # Definições e configurações centrais do projeto
│   │   ├── interfaces/  # Interfaces TypeScript usadas na aplicação
│   │   │   ├── token.interfaces.ts  # Estrutura do token de autenticação utilizado na API
│   ├── App.tsx      # Componente principal
│   ├── index.tsx    # Ponto de entrada do React
│   
├── public/          # Arquivos públicos
├── package.json     # Dependências e scripts
├── README.md        # Documentação
```