import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


export const TOKENSECRET =  process.env.TOKENSECRET
export const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URL;
        
        if (!mongoURI) {
            throw new Error('MONGO_URL no está definido en el archivo .env');
        }
        await mongoose.connect(mongoURI);
        console.log("Base de datos conectada.");
    } catch (error) {
        console.error('Error al conectar la base de datos:', error.message);
    }
};
