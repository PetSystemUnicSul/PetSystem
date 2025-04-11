const controller = require('../controllers/petshopController');

async function routes(fastify, options) {
  fastify.get('/', controller.listarTodos);
  fastify.post('/', controller.criar);
  fastify.get('/:id', controller.buscarPorId);
  fastify.put('/:id', controller.atualizar);
  fastify.delete('/:id', controller.deletar);
}

module.exports = routes;