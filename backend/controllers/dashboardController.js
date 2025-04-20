import mongoose from 'mongoose';
import { Cliente, Pet } from "../models/petshopModel.js";

 export async function BuscarClientes(request, reply) {
   try {
      const petshopId = request.user.id;

      const clientes = await Cliente.find({ petshopId })
        .populate({ path: "pets", select: "pet_nome" });


      const clientesFormatados = clientes.map((cliente) => ({
        tutor: cliente.cliente_nome,
        telefone: cliente.cliente_telefone.toString(),
        cpf: cliente.cliente_cpf,
        email: cliente.cliente_email,
        endereco: cliente.cliente_endereco,
        pets: cliente.pets.map((pet) => pet.pet_nome),
      }));

      return reply.code(200).send(clientesFormatados);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
      return reply.code(500).send({ message: "Erro ao buscar clientes" });
    }
}

export async function CriarClienteEPet(request, reply) {
  const petshopId = request.user.id;
  const { nome, telefone, email, CPF, endereco, pets } = request.body;

  // 1) inicia sessão/transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // 2) cria cliente
    const cliente = await Cliente.create(
      [
        {
          cliente_nome: nome,
          cliente_telefone: Number(telefone),
          cliente_email: email,
          cliente_cpf: CPF,
          cliente_endereco: endereco,
          petshopId,
          pets: [],
        },
      ],
      { session }
    );

    // create() com array retorna um array
    const novoCliente = cliente[0];

    // 3) cria todos os pets, empilhando os IDs no cliente.pets
    for (const p of pets) {
      const [novoPet] = await Pet.create(
        [
          {
            pet_nome: p.pet_nome,
            especie: p.especie,
            raca: p.raca,
            sexo: p.sexo,
            observacao: p.observacao,
            clienteId: novoCliente._id,
            petshopId,
          },
        ],
        { session }
      );

      novoCliente.pets.push(novoPet._id);
    }

    // 4) salva cliente com os pets vinculados
    await novoCliente.save({ session });

    // 5) confirma a transação e encerra sessão
    await session.commitTransaction();
    session.endSession();

    // 6) retorna o cliente já populado (opcionalmente, popula pets)
    const clientePopulado = await Cliente.findById(novoCliente._id)
      .populate("pets")
      .exec();

    return reply.status(201).send(clientePopulado);
  } catch (err) {
    // desfaz tudo em caso de erro
    if (session.inTransaction()) {
      await session.abortTransaction();
    }
    session.endSession();
    console.error(err);
    return reply.status(500).send({ error: "Erro ao criar cliente e pets", details: err.message });
  }
}
