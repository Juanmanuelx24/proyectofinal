import express from 'express';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';
import SalaRoutes from './routes/salaRoutes.js';
import ReservaRoutes from './routes/reservaRoutes.js';
import cors from 'cors'; // Importar CORS
import dotenv from 'dotenv'; // Asegúrate de usar dotenv si necesitas variables de entorno

dotenv.config();

const app = express();

// Configuración de CORS
const corsOptions = {
  origin: process.env.FRONEND_URL, // URL del frontend
  credentials: true,              // Permitir cookies en las solicitudes
};
app.use(cors(corsOptions)); // Usar el middleware de CORS

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

// Rutas
app.use('/api', authRoutes);
app.use('/api', SalaRoutes);
app.use('/api', ReservaRoutes);

export default app;
