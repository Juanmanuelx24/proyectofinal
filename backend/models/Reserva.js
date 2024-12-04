import mongoose from 'mongoose';

const reservaSchema = new mongoose.Schema({
  salaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sala',
    required: true
  },
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario', 
    required: true
  },
  fechaInicio: {
    type: Date,
    required: true
  },
  fechaFin: {
    type: Date,
    required: true
  },
  estado: {
    type: String,
    enum: ['Activo', 'Cancelado'],
    default: 'Activo'
  }
}, {
  timestamps: true, 
});

const Reserva = mongoose.model('Reserva', reservaSchema);

export default Reserva;
