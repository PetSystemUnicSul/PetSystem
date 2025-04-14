import Petshop from '../models/petshopModel.js';

export async function CadastrarPetShop(request, reply) {
  try {
    const { nome, email, nome_fantasia, cnpj, senha } = request.body;
    
    // Corrigido: usando "new" para criar instância do modelo
    const novoPetshop = new Petshop({
      nome, 
      email, 
      nome_fantasia, 
      cnpj,
      password: senha  // Mantendo a consistência com o modelo
    });
    
    await novoPetshop.save();
    
    return reply.code(201).send({ message: 'PetShop cadastrado com sucesso' });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return reply.code(400).send({ 
        error: 'Erro de validação',
        details: error.message 
      });
    }
    if (error.code === 11000) {
      return reply.code(400).send({ 
        error: 'Dados duplicados',
        message: 'Email, CNPJ ou nome fantasia já cadastrado'
      });
    }
    request.log.error(error);
    return reply.code(500).send({ error: 'Erro interno do servidor' });
  }
}