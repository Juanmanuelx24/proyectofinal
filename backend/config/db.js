import mongoose from 'mongoose';

export const TOKENSECRET = 'some secret key';

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://juanmanuelx242:manuel520@cluster-principal.ng4t7.mongodb.net/reservas_salas?retryWrites=true&w=majority&appName=Cluster-principal");
        console.log("Base de datos conectada.");
    } catch (error) {
        console.log(error);
    }
};
