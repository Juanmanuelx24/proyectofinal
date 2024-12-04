import { connectDB } from './config/db.js';
import app from './app.js';

const PORT = 3001;

connectDB();
app.listen(PORT)
console.log(`Server activado en el puerto http://localhost:${PORT}`);