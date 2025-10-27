# Library API - Fastify + MongoDB (Mongoose)

Projeto: API para gerenciamento de biblioteca (trabalho de banco de dados)

## Tecnologias
- Node.js (JavaScript, CommonJS)
- Fastify
- MongoDB + Mongoose
- dotenv

## Como usar
1. Renomeie `.env.example` para `.env` e configure `MONGO_URI` e `PORT`.
2. Instale dependências:
```bash
npm install
```
3. Rodar em modo desenvolvimento:
```bash
npm run dev
```
4. Limpar/recriar coleções (script):  
```bash
npm run collections
```

## Endpoints
- `POST /authors` - cadastrar autor
- `GET /authors` - listar autores
- `POST /users` - cadastrar usuário
- `GET /users` - listar usuários
- `POST /books` - cadastrar livro (campo author deve ser _id de um autor)
- `GET /books` - listar livros
- `POST /loans` - realizar empréstimo (body: `{ "userId": "...", "bookId": "..." }`)
- `GET /loans` - listar empréstimos

Leia `routes.http` para exemplos de requisições.

## Regras de Empréstimo
- Ao solicitar empréstimo, o sistema verifica `book.isAvailable`.
- Se `isAvailable` for `true`, cria um documento em `loans`, atualiza `isAvailable=false` e define `expectedReturnDate` para 3 dias à frente.
- Se `isAvailable` for `false` mas `expectedReturnDate` for anterior a data atual, permite o empréstimo (considera o livro com atraso).
- Caso contrário, nega o empréstimo informando que o livro está emprestado.

