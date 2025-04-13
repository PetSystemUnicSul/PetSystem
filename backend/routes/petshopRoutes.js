const petshopController = require('../controllers/petshopController');
const petshopUtilsController = require('../controllers/petshopUtilsController');

async function petshopRoutes(fastify, options) {
  // Rota para cadastro e atualização
  fastify.post('/', petshopController.criar);
  fastify.put('/:id', petshopController.atualizar);

  // Funções auxiliares de consulta e exclusão
  fastify.get('/', petshopUtilsController.listarTodos);
  fastify.get('/:id', petshopUtilsController.buscarPorId);
  fastify.delete('/:id', petshopUtilsController.deletar);
}

module.exports = petshopRoutes;
