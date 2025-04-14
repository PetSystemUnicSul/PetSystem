import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const petshopSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true,
  },
  nome_fantasia: { 
    type: String, 
    required: true, 
    unique: true 
  },
  cnpj: { 
    type: String,  
    required: true,  
    unique: true,  
  },
  password: { 
    type: String, 
    required: true, 
    minlength: [6, 'A senha deve ter pelo menos 6 caracteres'] 
  }
});

// Criptografia
petshopSchema.pre('save', async function() {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

export default mongoose.model('Petshop', petshopSchema);