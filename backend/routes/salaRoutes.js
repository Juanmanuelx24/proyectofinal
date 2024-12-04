import {Router} from 'express';
import { authRequired } from '../middleware/authMiddleware';
const {getSalas, createSala, updateSala, deleteSala} = require('../controllers/salaController.js');

const router = Router();


router.get('/sala', authRequired, getSalas);

router.post('/sala', authRequired, createSala);

router.put('/sala/:id', authRequired, updateSala);

router.delete('/sala/:id', authRequired, deleteSala);


export default router