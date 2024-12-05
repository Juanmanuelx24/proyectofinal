import express from 'express';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';
import SalaRoutes from './routes/salaRoutes.js';
// import ReservaRoutes from './routes/reservaRoutes.js';


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use('/api',authRoutes);
app.use('/api', SalaRoutes)
// app.use('/api', ReservaRoutes);

export default app;