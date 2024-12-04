import { connectDB } from './config/db.js';
import app from './app.js';
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT;

connectDB();
app.listen(PORT)
console.log(`Server activado en el puerto http://localhost:${PORT}`);