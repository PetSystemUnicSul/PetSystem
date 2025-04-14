import { CadastrarPetShop } from '../controllers/petshopController.js';

export default async function petshopRoutes(fastify, options) {
  // Rota para cadastro
  fastify.post('/cadastro', CadastrarPetShop);
}