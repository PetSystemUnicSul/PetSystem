const cors = require('@fastify/cors');

async function corsPlugin(fastify) {
  await fastify.register(cors, {
    origin: [
      'https://pet-system-delta.vercel.app',
      'http://localhost:5173'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  });
}

module.exports = corsPlugin;