const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const petshopSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Email inválido']
  },
  documento: {
    type: String,
    required: true,
    unique: true,
    set: v => v.replace(/\D/g, ''),
    validate: {
      validator: v => /^\d{14}$/.test(v),
      message: props => `${props.value} não é um CNPJ válido.`
    }
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'A senha deve ter pelo menos 6 caracteres']
  }
});

// Criptografia
petshopSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

module.exports = mongoose.model('Petshop', petshopSchema);
