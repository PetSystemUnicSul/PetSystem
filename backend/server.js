const fastify = require('fastify')({ logger: true })
const mongoose = require('mongoose')


// Conexão com MongoDB Atlas
mongoose.connect('mongodb+srv://petsystemuser:root@clusterpetsystem.q12wkvs.mongodb.net/dbpetsystem?retryWrites=true&w=majority&appName=ClusterPetSystem')
  .then(() => console.log("✅ Conectado ao MongoDB Atlas"))
  .catch(err => console.error("❌ Erro ao conectar:", err))

// Registrar rotas
fastify.register(require('./routes/petshopRoutes'))

// Iniciar servidor
fastify.listen({ port: 3000 }, () => {
  console.log('🚀 Servidor rodando na porta 3000')
})