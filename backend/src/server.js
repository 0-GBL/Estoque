import { app } from './app.js';
import { connectDatabase } from './config/database.js';
import { env } from './config/env.js';

async function start() {
  await connectDatabase();
  app.listen(env.port, () => console.log(`API disponível em http://localhost:${env.port}`));
}

start().catch((error) => {
  console.error('Não foi possível iniciar a API:', error.message);
  process.exit(1);
});
