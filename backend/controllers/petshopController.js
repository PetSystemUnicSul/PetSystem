const Petshop = require('../models/petshopModel');
const bcrypt = require('bcrypt');

module.exports = {
  // Cadastro de Petshop
  async criar(request, reply) {
    try {
      const novo = new Petshop(request.body);
      await novo.save();
      reply.code(201).send({ mensagem: 'Cadastro realizado com sucesso!', petshop: novo });
    } catch (err) {
      if (err.code === 11000) {
        const campo = Object.keys(err.keyPattern)[0];
        reply.code(400).send({ erro: `${campo.charAt(0).toUpperCase() + campo.slice(1)} já cadastrado.` });
      } else if (err.errors) {
        const mensagens = Object.values(err.errors).map(e => e.message);
        reply.code(400).send({ erro: 'Erro de validação', detalhes: mensagens });
      } else {
        reply.code(500).send({ erro: 'Erro ao cadastrar', detalhes: err.message });
      }
    }
  },

  // Atualização de Petshop
  async atualizar(request, reply) {
    try {
      const dados = request.body;
      if (dados.password) {
        dados.password = await bcrypt.hash(dados.password, 10);
      }

      const atualizado = await Petshop.findByIdAndUpdate(request.params.id, dados, { new: true });
      if (!atualizado) throw new Error();
      reply.send(atualizado);
    } catch {
      reply.code(404).send({ erro: "Erro ao atualizar" });
    }
  }
};
