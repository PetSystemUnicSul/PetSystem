import { CadastrarPetShop, Login} from '../controllers/petshopController.js';
import { DeletePetshop } from '../controllers/perfilController.js';
import { BuscarClientes, BuscarPets, CriarClienteEPet, DeletarCliente, CriarAgendamento, BuscarAgendamentos } from '../controllers/dashboardController.js';
import authMiddleware from '../middleware/authMiddleware.js';

export default async function petshopRoutes(fastify, options) {
  // Rotas públicas
  fastify.post('/cadastro', CadastrarPetShop);
  fastify.post('/login', Login);

  // Rotas protegidas
  fastify.register(async function (fastify) {
    fastify.addHook('preHandler', authMiddleware);

    fastify.get('/dashboard', async (request, reply) => {
      return reply.send({
        message: 'Rota protegida acessada com sucesso',
        user: request.user,
      });
    });

    fastify.post('/clientes', CriarClienteEPet);
    fastify.get('/clientes', BuscarClientes);
    fastify.delete('/clientes/:id', DeletarCliente);

    fastify.get('/pets', BuscarPets);

    //agendamentos
    fastify.post('/agendamentos', CriarAgendamento)
    fastify.get('/agendamentos', BuscarAgendamentos)

    // perfil
    fastify.delete('/perfil', DeletePetshop)
 
})};
