import 'dotenv/config';

const required = ['MONGODB_URI'];

for (const key of required) {
  if (!process.env[key]) {
    throw new Error(`Variável de ambiente obrigatória ausente: ${key}`);
  }
}

export const env = {
  port: Number(process.env.PORT) || 3333,
  mongoUri: process.env.MONGODB_URI,
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173'
};
