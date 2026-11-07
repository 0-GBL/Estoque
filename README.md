# Controle de Estoque

Projeto full-stack para gerenciamento de produtos com operações de criação, consulta, atualização e exclusão.

## Estrutura

```text
estoque/
├── backend/   # API REST e integração MongoDB Atlas
└── frontend/  # Aplicação React
```

## Tecnologias

- **Backend:** Node.js, Express, Mongoose, Zod, dotenv e CORS.
- **Frontend:** React, Vite, Axios e CSS puro.
- **Banco de dados:** MongoDB Atlas.

## Como executar

### 1. Configure o backend

```bash
cd backend
copy .env.example .env
npm install
npm run dev
```

Edite o arquivo `.env` e informe a sua `MONGODB_URI` do MongoDB Atlas. A API inicia em `http://localhost:3333`.

### 2. Configure o frontend

Em outro terminal:

```bash
cd frontend
copy .env.example .env
npm install
npm run dev
```

Abra o endereço informado pelo Vite (normalmente `http://localhost:5173`).

## API

| Método | Rota | Descrição |
| --- | --- | --- |
| GET | `/api/products` | Lista todos os produtos |
| POST | `/api/products` | Cadastra um produto |
| PUT | `/api/products/:id` | Atualiza um produto |
| DELETE | `/api/products/:id` | Remove um produto |

### Exemplo de produto

```json
{
  "name": "Teclado mecânico",
  "price": 299.9,
  "quantity": 10,
  "code": "TEC-001"
}
```

> Não versione os arquivos `.env`: eles já estão cobertos pelos respectivos `.gitignore`.
