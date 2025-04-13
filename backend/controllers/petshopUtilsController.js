const Petshop = require('../models/petshopModel');

module.exports = {
  // Consulta de todos os petshops
  async listarTodos(request, reply) {
    const petshops = await Petshop.find({}, '-password');
    reply.send(petshops);
  },

  // Busca petshop por ID
  async buscarPorId(request, reply) {
    try {
      const petshop = await Petshop.findById(request.params.id).select('-password');
      if (!petshop) throw new Error();
      reply.send(petshop);
    } catch {
      reply.code(404).send({ erro: "Petshop não encontrado" });
    }
  },

  // Exclusão de Petshop
  async deletar(request, reply) {
    try {
      const deletado = await Petshop.findByIdAndDelete(request.params.id);
      if (!deletado) throw new Error();
      reply.send({ status: "Petshop deletado com sucesso" });
    } catch {
      reply.code(404).send({ erro: "Erro ao deletar" });
    }
  }
};
