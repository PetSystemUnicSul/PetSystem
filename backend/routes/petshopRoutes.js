import { CadastrarPetShop, Login} from '../controllers/petshopController.js';
import { DeletePetshop, UpdatePetshop } from '../controllers/perfilController.js';
import { BuscarClientes, BuscarPets, CriarClienteEPet, DeletarCliente, CriarAgendamento, BuscarAgendamentos, AtualizarClienteEPets, StatusAgendamento, EditarAgendamento } from '../controllers/dashboardController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { Pagamento, WebhookPagamento } from '../controllers/pagamentoController.js';

export default async function petshopRoutes(fastify, options) {
  // Rotas públicas
  fastify.post('/cadastro', CadastrarPetShop);
  fastify.post('/login', Login);

  // pagamento
  fastify.post('/pagamento', Pagamento)
  fastify.post('/webhook', WebhookPagamento);

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
    fastify.put('/clientes/:id', AtualizarClienteEPets);

    fastify.get('/pets', BuscarPets);

    // agendamentos
    fastify.post('/agendamentos', CriarAgendamento)
    fastify.get('/agendamentos', BuscarAgendamentos)
    fastify.post('/agendamentos/:id', StatusAgendamento)
    fastify.put('/agendamentos/:id', EditarAgendamento)

    // perfil
    fastify.delete('/perfil', DeletePetshop)
    fastify.put('/perfil', UpdatePetshop)
 
})};
