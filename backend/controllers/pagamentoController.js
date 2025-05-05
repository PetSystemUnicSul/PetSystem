import axios from 'axios';

export async function Pagamento (request, reply) {
    try {
        const response = await axios.post(
          'https://api.mercadopago.com/checkout/preferences',
          {
            items: [
              {
                title: 'Assinatura Premium',
                quantity: 1,
                unit_price: 5.0,
                currency_id: 'BRL',
              },
            ],
            back_urls: {
              success: 'https://pet-system-delta.vercel.app/',
              failure: 'https://pet-system-delta.vercel.app/',
              pending: 'https://pet-system-delta.vercel.app/',
            },
            auto_return: 'approved',
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
            },
          }
        );
    
        return { init_point: response.data.init_point };
      } catch (error) {
        console.error(error.response?.data || error);
        reply.code(500).send({ error: 'Erro ao criar preferência' });
      }
  };

export async function WebhookPagamento(request, reply) {
    try {
      const paymentId = request.body.data.id;
  
      // Consultar status do pagamento
      const pagamento = await axios.get(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: {
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        },
      });
  
      const status = pagamento.data.status;
      const userEmail = pagamento.data.payer?.email;
  
      if (userEmail && status === 'approved') {
        await Petshop.findOneAndUpdate(
          { email: userEmail },
          {
            id_pagamento: paymentId,
            status_pagamento: 'Aprovado',
          }
        );
      }
  
      return reply.code(200).send({ received: true });
    } catch (err) {
      console.error('Erro no webhook:', err.response?.data || err);
      return reply.code(500).send({ error: 'Erro no webhook' });
    }
  }
  