require('dotenv').config();
const app = require('./app');

const start = async () => {
  try {
    await app.listen({ port: process.env.PORT || 3000, host: '0.0.0.0' });
    app.log.info(`Servidor rodando na porta ${process.env.PORT || 3000}`);
    // console.log('Servidor rodando na porta 3000');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
