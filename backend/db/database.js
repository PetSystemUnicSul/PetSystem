const mongoose = require('mongoose');

const connectDB = async (fastify) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    fastify.log.info('Conectado ao MongoDB Atlas');
  } catch (err) {
    fastify.log.error('Erro ao conectar ao MongoDB:', err);
    process.exit(1);
  }

};

module.exports = connectDB;