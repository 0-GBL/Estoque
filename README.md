# Stockly — Controle de Estoque

Uma aplicação full-stack de controle de estoque, criada como projeto de portfólio. O sistema reúne gestão de produtos, entradas e saídas, alertas de reposição e um dashboard baseado nos dados reais do MongoDB.

## Destaques

- Dashboard com indicadores de produtos, unidades, valor armazenado e alertas.
- Gráfico de disponibilidade e atividade recente.
- CRUD completo de produtos, com código único e validações de dados.
- Busca por nome/código, filtros de estoque e ordenação do catálogo.
- Registro de entradas e saídas com atualização automática do saldo.
- Bloqueio de saídas superiores ao estoque disponível.
- Histórico das últimas 100 movimentações.
- Layout responsivo para desktop e celular.

## Tecnologias

| Camada | Tecnologias |
| --- | --- |
| Interface | React 18, Vite, Axios, Recharts e Lucide React |
| API | Node.js, Express, Mongoose e Zod |
| Banco de dados | MongoDB Atlas |
| Qualidade | ESLint e Node Test Runner |

## Estrutura

```text
estoque/
├── backend/
│   ├── src/
│   │   ├── controllers/  # Orquestram as requisições
│   │   ├── services/     # Regras de negócio
│   │   ├── models/       # Modelos Mongoose
│   │   ├── schemas/      # Validações Zod
│   │   ├── routes/       # Endpoints HTTP
│   │   └── config/
│   └── test/
└── frontend/
    └── src/
        ├── components/
        └── services/
```

## Como executar

Pré-requisitos: Node.js 20+ e uma instância do MongoDB Atlas.

### Backend

```powershell
cd backend
copy .env.example .env
npm install
npm run dev
```

No arquivo `backend/.env`, informe sua string de conexão:

```env
PORT=3333
MONGODB_URI=mongodb+srv://<usuario>:<senha>@<cluster>.mongodb.net/estoque?retryWrites=true&w=majority
FRONTEND_URL=http://localhost:5173
```

### Frontend

Em outro terminal:

```powershell
cd frontend
copy .env.example .env
npm install
npm run dev
```

O Vite exibirá a URL local, normalmente `http://localhost:5173`.

## API

Base URL: `http://localhost:3333/api`

| Método | Endpoint | Descrição |
| --- | --- | --- |
| GET | `/dashboard` | Indicadores e movimentações recentes |
| GET | `/products` | Lista produtos |
| POST | `/products` | Cria produto |
| PUT | `/products/:id` | Atualiza produto |
| DELETE | `/products/:id` | Exclui produto |
| GET | `/movements` | Lista movimentações recentes |
| POST | `/movements` | Registra entrada ou saída |

### Filtros de produtos

`GET /products?search=mouse&stock=low&sort=quantity`

- `search`: busca por nome ou código;
- `stock`: `low` (até 5 unidades) ou `out` (sem estoque);
- `sort`: `newest`, `name`, `price` ou `quantity`.

### Criar produto

```json
POST /api/products
{
  "name": "Mouse sem fio",
  "price": 129.9,
  "quantity": 12,
  "code": "MOU-001"
}
```

### Registrar movimentação

```json
POST /api/movements
{
  "productId": "507f1f77bcf86cd799439011",
  "type": "OUT",
  "quantity": 2,
  "note": "Venda #1024"
}
```

Use `IN` para entrada e `OUT` para saída. A API retorna `422` quando não há saldo suficiente para uma saída.

## Qualidade

```powershell
cd backend
npm test
npm run lint

cd ../frontend
npm run lint
npm run build
```

Os testes atuais cobrem as principais regras de validação: normalização do código, bloqueio de quantidade negativa e movimentações sem quantidade válida.

## Segurança

Credenciais não são armazenadas no código. Os arquivos `.env` são ignorados pelo Git; use apenas os arquivos `.env.example` como modelo.
