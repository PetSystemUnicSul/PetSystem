import { Petshop } from '../models/petshopModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function CadastrarPetShop(request, reply) {
  try {
    const { nome, email, nome_fantasia, cnpj, senha, telefone, cep, endereco } = request.body;
    
    const novoPetshop = new Petshop({
      nome, 
      email, 
      nome_fantasia, 
      cnpj,
      password: senha, 
      telefone: telefone || "",  
      cep: cep || "",            
      endereco: endereco || ""   
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

export async function Login(request, reply) {
  try {
    const { email, senha } = request.body;
    
    const petshop = await Petshop.findOne({ email });
    
    if (!petshop) {
      return reply.code(401).send({ error: 'Email ou senha inválidos' });
    }
    
    const senhaCorreta = await bcrypt.compare(senha, petshop.password);
    
    if (!senhaCorreta) {
      return reply.code(401).send({ error: 'Email ou senha inválidos' });
    }
    
    const token = jwt.sign(
      { 
        id: petshop._id,
        email: petshop.email,
        nome: petshop.nome,
        nome_fantasia: petshop.nome_fantasia
      }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1d' }
    );
    
    const userData = {
      id: petshop._id,
      nome: petshop.nome,
      email: petshop.email,
      nome_fantasia: petshop.nome_fantasia,
      cnpj: petshop.cnpj,
      endereco: petshop.endereco || "", 
      cep: petshop.cep || "",            
      telefone: petshop.telefone || "",  
    };
    
    return reply.code(200).send({ 
      message: 'Login realizado com sucesso',
      token,
      user: userData
    });
  } catch (error) {
    request.log.error(error);
    return reply.code(500).send({ error: 'Erro interno do servidor' });
  }
}