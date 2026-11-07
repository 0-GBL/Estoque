import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import { env } from './config/env.js';
import { productRoutes } from './routes/productRoutes.js';

export const app = express();

app.use(cors({ origin: env.frontendUrl }));
app.use(express.json());

app.get('/health', (_request, response) => response.json({ status: 'ok' }));
app.use('/api/products', productRoutes);

app.use((error, _request, response, _next) => {
  if (error instanceof mongoose.Error.CastError) {
    return response.status(400).json({ message: 'Identificador de produto inválido.' });
  }
  if (error?.code === 11000) {
    return response.status(409).json({ message: 'Já existe um produto com este código.' });
  }
  console.error(error);
  return response.status(error.statusCode || 500).json({ message: error.message || 'Erro interno do servidor.' });
});
