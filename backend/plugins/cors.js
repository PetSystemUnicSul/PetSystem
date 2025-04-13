const cors = require('@fastify/cors');

async function corsPlugin(fastify) {
  await fastify.register(cors, {
    origin: [
      'https://pet-system-delta.vercel.app', // produção
      'http://localhost:5173'               // desenvolvimento
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
}

module.exports = corsPlugin;