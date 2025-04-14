import 'dotenv/config';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import { connectDB } from './db/database.js';
import petshopRoutes from './routes/petshopRoutes.js';

const start = async () => {
  const server = Fastify({ logger: true });
  
  // Registrar plugins
  await server.register(cors, {
    origin: ['https://pet-system-delta.vercel.app', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  
  // Conectar ao banco de dados
  await connectDB(server);
  
  // Registrar rotas
  await server.register(petshopRoutes);
  
  try {
    await server.listen({ port: process.env.PORT || 3000, host: '0.0.0.0' });
    console.log(`Servidor rodando na porta ${process.env.PORT || 3000}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();