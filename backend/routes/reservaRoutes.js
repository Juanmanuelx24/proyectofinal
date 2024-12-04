import { Router } from 'express';
import { authRequired } from '../middleware/authMiddleware';
const { getReservas, createReservas, updateReservas, deleteReservas } = require('../controllers/reservaController.js');

const router = Router();

router.get('/reservas', authRequired, getReservas);

router.post('/reservas', authRequired, createReservas);

router.put('/reservas/:id', authRequired, updateReservas);

router.delete('/reservas/:id', authRequired, deleteReservas);

export default router;
