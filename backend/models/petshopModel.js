import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// Schema do Petshop
const petshopSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  nome_fantasia: { type: String, required: true, unique: true },
  cnpj: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
    minlength: [6, "A senha deve ter pelo menos 6 caracteres"],
  },
});

petshopSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

// Schema do Pet
const petSchema = new mongoose.Schema({
  pet_nome: { type: String, required: true },
  especie: { type: String, required: true },
  raca: { type: String },
  sexo: {type: String, required: true},
  observacao: {type: String, required: true},
  clienteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
  petshopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Petshop', required: true }
});

// Schema do Cliente
const clienteSchema = new mongoose.Schema({
  cliente_nome: { type: String, required: true },
  cliente_telefone: { type: Number, required: true, unique: true },
  cliente_email: { type: String, required: true, unique: true },
  cliente_cpf: { type: String, required: true, unique: true },
  cliente_endereco: { type: String, required: true },
  petshopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Petshop', required: true },
  pets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pet' }]
});

// Schema do Agendamento
const agendamentoSchema = new mongoose.Schema({
  clienteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
  petId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },
  petshopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Petshop', required: true },
  data: { type: String, required: true },
  horario: { type: String, required: true },
  servico: { type: String, required: true }
});

// Criando os models
const Petshop = mongoose.model("Petshop", petshopSchema);
const Cliente = mongoose.model("Cliente", clienteSchema);
const Pet = mongoose.model("Pet", petSchema);
const Agendamento = mongoose.model('Agendamento', agendamentoSchema);

// Exportando tudo
export { Petshop, Cliente, Pet, Agendamento};
