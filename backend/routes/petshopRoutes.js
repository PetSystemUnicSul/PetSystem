const PetshopController = require('../controllers/PetshopController')

async function petshopRoutes(fastify, options) {
  fastify.post('/petshops', PetshopController.criar)
  fastify.get('/petshops', PetshopController.listarTodos)
  fastify.get('/petshops/:id', PetshopController.buscarPorId)
  fastify.put('/petshops/:id', PetshopController.atualizar)
  fastify.delete('/petshops/:id', PetshopController.deletar)
}

module.exports = petshopRoutes
