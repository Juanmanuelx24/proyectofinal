import mongoose from 'mongoose';

const salaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    unique: true, //
    trim: true
  },
  capacidad: {
    type: Number,
    required: true, 
    min: [1, 'La capacidad debe ser al menos 1.']
  },
  estado: {
    type: String,
    enum: ['Activo', 'Inactivo'], 
    default: 'Activo' 
  },
  ubicacion: {
    type: String,
    required: true, 
    trim: true
  }
}, {
  timestamps: true, 
});


const Sala = mongoose.model('Sala', salaSchema);

export default Sala;
