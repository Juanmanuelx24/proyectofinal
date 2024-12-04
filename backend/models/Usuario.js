import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true 
  },
  correo: {
    type: String,
    required: true,
    unique: true,  
    trim: true
  },
  contraseña: {
    type: String,
    required: true,
  },
  rol: {
    type: String,
    enum: ['Admin', 'Usuario'],  
    default: 'Usuario',  
  },
},{
  timestamps: true,
});

usuarioSchema.pre('save', async function (next) {
  if (!this.isModified('contraseña')) return next();
  const salt = await bcrypt.genSalt(10);
  this.contraseña = await bcrypt.hash(this.contraseña, salt);
  next();
});
usuarioSchema.methods.compararContraseña = async function (contraseñaProporcionada) {
  return await bcrypt.compare(contraseñaProporcionada, this.contraseña);
};
const Usuario = mongoose.model('Usuario', usuarioSchema);

export default Usuario;
