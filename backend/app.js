import express from 'express';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';
import SalaRoutes from './routes/salaRoutes.js';
import ReservaRoutes from './routes/reservaRoutes.js';
import cors from 'cors'; 
import dotenv from 'dotenv'; 

dotenv.config();

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL, 
  credentials: true,              
};
app.use(cors(corsOptions)); 


app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));


app.use('/api', authRoutes);
app.use('/api', SalaRoutes);
app.use('/api', ReservaRoutes);

export default app;
