import mongoose from 'mongoose';

export const TOKENSECRET = process.env.TOKEN_SECRET || '10aa592b927da053cbccac00c37d1e1a5440a52e1749107cbafb06eee3c72d85429c347b63ff50013eb33f83f72d785f68a37b4db267785d075ef0c85854268b';


export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://juanmanuelx242:manuel520@cluster-principal.ng4t7.mongodb.net/reservas_salas?retryWrites=true&w=majority&appName=Cluster-principal");
        console.log("Base de datos conectada.");
    } catch (error) {
        console.log(error);
    }
};
