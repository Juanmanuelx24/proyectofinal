import { Router } from 'express';
import { getSalas, createSala, updateSala, deleteSala } from '../controllers/salaController.js';

const router = Router();

router.get('/sala', getSalas);

router.post('/sala', createSala);

router.put('/sala/:id', updateSala);

router.delete('/sala/:id', deleteSala);

export default router;
