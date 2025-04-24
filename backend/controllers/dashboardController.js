import mongoose from 'mongoose';
import { Cliente, Pet, Agendamento } from "../models/petshopModel.js";

export async function BuscarClientes(request, reply) {
  try {
    const petshopId = request.user.id;

    const clientes = await Cliente.find({ petshopId })
      .populate({ path: "pets" });

    const clientesFormatados = clientes.map((cliente) => ({
      id: cliente._id,
      tutor: cliente.cliente_nome,
      telefone: cliente.cliente_telefone.toString(),
      cpf: cliente.cliente_cpf,
      email: cliente.cliente_email,
      endereco: cliente.cliente_endereco,
      pets: cliente.pets,
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

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
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

    const novoCliente = cliente[0];

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

    await novoCliente.save({ session });

    await session.commitTransaction();
    session.endSession();

    const clientePopulado = await Cliente.findById(novoCliente._id)
      .populate("pets")
      .exec();

    return reply.status(201).send(clientePopulado);
  } catch (err) {
    if (session.inTransaction()) {
      await session.abortTransaction();
    }
    session.endSession();
    console.error(err);
    return reply.status(500).send({ error: "Erro ao criar cliente e pets", details: err.message });
  }
}

export async function AtualizarClienteEPets(request, reply) {
  const { id } = request.params;
  const petshopId = request.user.id;
  const { nome, telefone, email, CPF, endereco, pets } = request.body;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const clienteAtualizado = await Cliente.findOneAndUpdate(
      { _id: id, petshopId },
      {
        cliente_nome: nome,
        cliente_telefone: Number(telefone),
        cliente_email: email,
        cliente_cpf: CPF,
        cliente_endereco: endereco
      },
      { new: true, session }
    );

    if (!clienteAtualizado) {
      await session.abortTransaction();
      session.endSession();
      return reply.status(404).send({ error: "Cliente não encontrado" });
    }

    for (const p of pets) {
      if (p._id) {
        await Pet.findByIdAndUpdate(
          p._id,
          {
            pet_nome: p.pet_nome,
            especie: p.especie,
            raca: p.raca,
            sexo: p.sexo,
            observacao: p.observacao
          },
          { session }
        );
      } else {
        const novoPet = await Pet.create(
          [
            {
              pet_nome: p.pet_nome,
              especie: p.especie,
              raca: p.raca,
              sexo: p.sexo,
              observacao: p.observacao,
              clienteId: clienteAtualizado._id,
              petshopId,
            },
          ],
          { session }
        );
        clienteAtualizado.pets.push(novoPet[0]._id);
      }
    }

    await clienteAtualizado.save({ session });

    await session.commitTransaction();
    session.endSession();

    const clientePopulado = await Cliente.findById(id).populate("pets");
    return reply.status(200).send(clientePopulado);
  } catch (err) {
    if (session.inTransaction()) await session.abortTransaction();
    session.endSession();
    console.error("Erro ao atualizar cliente e pets:", err);
    return reply.status(500).send({ error: "Erro ao atualizar cliente e pets", details: err.message });
  }
}

export async function DeletarCliente(request, reply) {
  const { id } = request.params;
  const petshopId = request.user.id;

  try {
    const cliente = await Cliente.findOneAndDelete({ _id: id, petshopId });

    if (!cliente) {
      return reply.status(404).send({ error: "Cliente não encontrado" });
    }

    await Pet.deleteMany({ clienteId: id });

    return reply.status(200).send({ message: "Cliente deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar cliente:", error);
    return reply.status(500).send({ error: "Erro ao deletar cliente" });
  }
}

export async function BuscarPets(request, reply) {
  try {
    const petshopId = request.user.id;

    const pets = await Pet.find({ petshopId })
      .populate("clienteId")
      .populate("petshopId");

    return reply.status(200).send(pets);
  } catch (error) {
    console.error("Erro ao buscar pets:", error);
    return reply.status(500).send({ error: "Erro ao buscar pets" });
  }
}

export async function CriarAgendamento(request, reply) {
  const petshopId = request.user.id;
  const { clienteId, petId, data, horario, servico } = request.body;

  try {
    const novoAgendamento = await Agendamento.create({
      clienteId,
      petId,
      petshopId,
      data,
      horario,
      servico
    });

    return reply.code(201).send(novoAgendamento);
  } catch (error) {
    console.error("Erro ao criar agendamento:", error);
    return reply.code(500).send({ message: "Erro ao criar agendamento" });
  }
}

export async function BuscarAgendamentos(request, reply) {
  try {
    const petshopId = request.user.id;

    const agendamentos = await Agendamento.find({ petshopId })
      .populate("clienteId", "cliente_nome cliente_telefone")
      .populate("petId", "pet_nome especie raca");

    return reply.code(200).send(agendamentos);
  } catch (error) {
    console.error("Erro ao buscar agendamentos:", error);
    return reply.code(500).send({ message: "Erro ao buscar agendamentos" });
  }
}
