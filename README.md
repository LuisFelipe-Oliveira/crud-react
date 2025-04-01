# CRUD de Produtos - React, TypeScript e API Externa

## Descrição

Este é um projeto de CRUD (Create, Read, Update, Delete) desenvolvido em React com TypeScript, que interage com uma API externa para gerenciar produtos. O sistema realiza automaticamente a autenticação via email e senha ao se conectar com a API.

As principais funcionalidades incluem:
- Autenticação de usuários
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
- [SweetAlert2](https://sweetalert2.github.io/)

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
A API utilizada exige autenticação com email e senha. O login deve ser realizado através da tela de login.

### 4. Executar o Projeto
```bash
npm start
# ou
yarn start
```
A aplicação estará disponível em [http://localhost:3000](http://localhost:3000/).

## Uso da API

O projeto consome uma API para gerenciar produtos. Abaixo estão os endpoints utilizados:

- **Login:** `POST /auth/login` 
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
│   ├── styles/      # Arquivos SCSS
│   ├── routes/      # Arquivos de roteamento
│   │   ├── privateRoutes.tsx  # Protege as rotas para que um usuário deslogado não consiga acessá-las diretamente pela URL
│   │   ├── router.tsx         # Arquivo onde são definidas todas as rotas da aplicação
│   ├── core/        # Definições e configurações centrais do projeto
│   │   ├── interfaces/  # Interfaces TypeScript usadas na aplicação
│   │   │   ├── token.interfaces.ts  # Estrutura do token de autenticação utilizado na API
│   ├── service/      # Configurações e métodos para fazer requisições à API
│   │   ├── apiMethods.ts  # Arquivo que exporta as funções de requisição para a API (login, create, update, etc.)
│   │   ├── axios.ts       # Arquivo que contém a configuração padrão da API (baseURL, headers, etc.)
│   ├── App.tsx      # Componente principal
│   ├── index.tsx    # Ponto de entrada do React
│   
├── public/          # Arquivos públicos
├── package.json     # Dependências e scripts
├── README.md        # Documentação
```

### Documentação dos Componentes

#### 1. **Footer**
**Responsabilidade:**
O `Footer` é o rodapé da aplicação e exibe informações de direitos autorais e o nome do desenvolvedor.

**Propriedades:**
- Nenhuma propriedade é utilizada, pois o conteúdo é estático.

---

#### 2. **Header**
**Responsabilidade:**
O `Header` é o cabeçalho da aplicação e contém o logotipo e o título "ProMaster".

**Propriedades:**
- Nenhuma propriedade é utilizada, pois o conteúdo é estático.

---

#### 3. **FormInput**
**Responsabilidade:**
O `FormInput` é um campo de entrada reutilizável para formulários.

**Propriedades:**
- `type` (opcional): Tipo do input (`"text"`, `"number"`, `"password"`).
- `name`: Nome do input.
- `value`: Valor do input.
- `htmlFor`: Associado ao label do input.
- `nameLabel`: Texto do label.
- `placeholder` (opcional): Placeholder do input.
- `onChange`: Função chamada ao alterar o valor do input.
- `required` (opcional): Define se o campo é obrigatório.

---

#### 4. **Form**
**Responsabilidade:**
O `Form` é responsável por capturar e enviar dados de produtos para cadastro ou atualização.

**Propriedades:**
- `title`: Título do formulário.
- `buttonForm`: Texto do botão de submissão.
- `productId` (opcional): ID do produto (caso seja uma edição).
- `existingProduct` (opcional): Dados do produto para edição.

**Estados:**
- `product`: Armazena os dados do produto.

**Funções:**
- `handleChange`: Atualiza o estado do produto conforme o usuário preenche o formulário.
- `handlerSubmit`: Valida os dados e envia a requisição de cadastro ou atualização para a API.

**Componentes Utilizados:**
- `FormInput`
- `FormSelect`

---

#### 5. **FormSelect**
**Responsabilidade:**
O `FormSelect` é um componente reutilizável para seleção de status de produtos.

**Propriedades:**
- `htmlFor`: Associado ao label do select.
- `nameLabel`: Texto do label.
- `name`: Nome do select.
- `value`: Valor do select.
- `onChange`: Função chamada ao alterar o valor do select.
- `required` (opcional): Define se o campo é obrigatório.

**Opções de Seleção:**
- `0`: "Selecione um status"
- `1`: "Em estoque"
- `2`: "Em reposição"
- `3`: "Em falta"

---

### Considerações
- O `Form` é o componente mais complexo e centraliza as ações de cadastro e edição de produtos.
- O `Footer` e o `Header` são componentes estáticos usados para estruturar a interface.
- Os componentes `FormInput` e `FormSelect` são reutilizáveis e podem ser usados em outros formulários.