import { Router } from 'express';
import { getReservas, createReservas, updateReservas, deleteReservas } from '../controllers/reservaController.js';  

const router = Router();

router.get('/reservas', getReservas);

router.post('/reservas', createReservas);

router.put('/reservas/:id', updateReservas);

router.delete('/reservas/:id', deleteReservas);

export default router;
