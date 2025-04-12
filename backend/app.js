const fastify = require('fastify')({ logger: true });
const connectDB = require('./db/database');
const corsPlugin = require('./plugins/cors');

// MongoDB
connectDB(fastify);

// Plugin
fastify.register(corsPlugin);

// Rota
const petshopRoutes = require('./routes/petshopRoutes');
fastify.register(petshopRoutes, { prefix: '/api/petshop' });

module.exports = fastify;
