const Petshop = require('../models/PetshopModel')
const bcrypt = require('bcrypt')

module.exports = {
    // CRUD
    //CREATE
  async criar(request, reply) {
    try {
      const novo = new Petshop(request.body)
      await novo.save()
      reply.send(novo)
    } catch (err) {
      reply.code(400).send({ erro: "Erro ao cadastrar", detalhes: err.message })
    }
  },

  async listarTodos(request, reply) {
    const petshops = await Petshop.find({}, '-password')
    reply.send(petshops)
  },

    //READ
  async buscarPorId(request, reply) {
    try {
      const petshop = await Petshop.findById(request.params.id).select('-password')
      if (!petshop) throw new Error()
      reply.send(petshop)
    } catch {
      reply.code(404).send({ erro: "Petshop não encontrado" })
    }
  },
  //UPDATE
  async atualizar(request, reply) {
    try {
      const dados = request.body
      if (dados.password) {
        dados.password = await bcrypt.hash(dados.password, 10)
      }
      const atualizado = await Petshop.findByIdAndUpdate(request.params.id, dados, { new: true })
      reply.send(atualizado)
    } catch {
      reply.code(404).send({ erro: "Erro ao atualizar" })
    }
  },
  //DELETE
  async deletar(request, reply) {
    try {
      await Petshop.findByIdAndDelete(request.params.id)
      reply.send({ status: "Petshop deletado com sucesso" })
    } catch {
      reply.code(404).send({ erro: "Erro ao deletar" })
    }
  }
}
