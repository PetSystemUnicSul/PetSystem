const mongoose = require('mongoose')

const petshopSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  documento: {
    type: String,
    required: true,
    unique: true,
    set: v => v.replace(/\D/g, ''),
    validate: {
      validator: v => /^\d{11}$/.test(v) || /^\d{14}$/.test(v),
      message: props => `${props.value} não é um CPF ou CNPJ válido.`
    }
  },
  password: {
    type: String,
    required: true
  }
})

// Criptografia
const bcrypt = require('bcrypt')
petshopSchema.pre('save', async function () {
    if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 10)
    }
})
  

module.exports = mongoose.model('Petshop', petshopSchema)
