import { CadastrarPetShop, Login} from '../controllers/petshopController.js';
import { BuscarClientes } from '../controllers/dashboardController.js';
import authMiddleware from '../middleware/authMiddleware.js';

export default async function petshopRoutes(fastify, options) {
  // Rotas públicas
  fastify.post('/cadastro', CadastrarPetShop);
  fastify.post('/login', Login);
  
  // Rotas protegidas
  // Adicione o middleware de autenticação para as rotas que precisam de autenticação
  fastify.register(async function(fastify) {
    // Aplica o middleware de autenticação para todas as rotas deste escopo
    fastify.addHook('preHandler', authMiddleware);
    
    // Rotas protegidas aqui
    fastify.get('/dashboard', async (request, reply) => {
      return reply.send({ 
        message: 'Rota protegida acessada com sucesso',
        user: request.user
      });
    });

    fastify.get('/clientes', BuscarClientes);
    
  });
}