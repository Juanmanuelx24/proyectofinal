import { Router } from 'express';
import { getReservas, createReserva, updateReserva, deleteReserva } from '../controllers/reservaController.js';

const router = Router();

router.get('/reservas', getReservas);
router.post('/reservas', createReserva);
router.put('/reservas/:id', updateReserva);
router.delete('/reservas/:id', deleteReserva);


export default router;
