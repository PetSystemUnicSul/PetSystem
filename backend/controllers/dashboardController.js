import { Cliente, Pet } from "../models/petshopModel.js";

export async function BuscarClientes(request, reply) {
  try {
    const petshopId = request.user.petshopId;

    const clientes = await Cliente.find({ petshopId }).populate({
      path: "pets",
      select: "nome -_id",
    });

    const clientesFormatados = clientes.map(cliente => ({
      tutor: cliente.cliente_nome,
      pets: cliente.pets.map(pet => pet.nome),
      telefone: cliente.cliente_telefone.toString(),
      cpf: cliente.cliente_cpf,
      email: cliente.cliente_email,
      endereco: cliente.cliente_endereco
    }));

    return reply.code(200).send(clientesFormatados);
  } catch (error) {
    console.error("Erro ao buscar clientes:", error);
    return reply.code(500).send({ message: "Erro ao buscar clientes" });
  }
}