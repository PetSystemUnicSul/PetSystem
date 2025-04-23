import { Cliente, Pet, Petshop } from "../models/petshopModel.js";

export async function DeletePetshop (request, reply) {
    try {
        const petshopId = request.user.id;
        console.log(petshopId)

        await Pet.deleteMany({ petshopId });
        await Cliente.deleteMany({ petshopId });
        const deletedPetshop = await Petshop.findByIdAndDelete({_id: petshopId});

        return reply.status(200).send({ message: 'Petshop e dados relacionados deletados com sucesso' });
    } catch (error) {
        console.error(error);
        return reply.status(500).send({ message: 'Erro ao deletar o petshop e dados relacionados' });
    }
};

export async function UpdatePetshop (request, reply) {
    try {
        const petshopId = request.user.id;
        const { nome, email, nome_fantasia, cnpj, endereco, cep, telefone } = request.body;

        const updatedPetshop = await Petshop.findByIdAndUpdate(
            petshopId,
            { nome, email, nome_fantasia, cnpj, endereco, cep, telefone },
            { new: true, runValidators: true }
        );

        return reply.status(200).send(updatedPetshop);
    } catch (error) {
        console.error(error);
        return reply.status(500).send({ message: 'Erro ao atualizar o petshop' });
    }
};