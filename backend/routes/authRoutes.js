import { Router } from "express";
import { login, register, logout, profile } from '../controllers/usuarioController.js';
import {authRequired} from '../middleware/authMiddleware.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);       
router.post('/logout', authRequired, logout); 
router.get('/profile', authRequired,profile)

export default router;
