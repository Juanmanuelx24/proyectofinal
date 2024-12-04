import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true //elimina los espeacios en blanco
  },
  correo: {
    type: String,
    required: true,
    unique: true,  // Asegura que el correo sea único
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

// Middleware para encriptar la contraseña antes de guardar el usuario
usuarioSchema.pre('save', async function (next) {
  if (!this.isModified('contraseña')) return next();

  // Encriptar la contraseña con bcrypt
  const salt = await bcrypt.genSalt(10);
  this.contraseña = await bcrypt.hash(this.contraseña, salt);
  next();
});

// Método para comparar contraseñas
usuarioSchema.methods.compararContraseña = async function (contraseñaProporcionada) {
  return await bcrypt.compare(contraseñaProporcionada, this.contraseña);
};

// Crear el modelo de Usuario basado en el esquema
const Usuario = mongoose.model('Usuario', usuarioSchema);

export default Usuario;
