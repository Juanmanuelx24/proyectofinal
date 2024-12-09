import axios from 'axios';

const client = axios.create({
    baseURL: 'http://localhost:3000/api', // URL base del backend
    timeout: 5000, // Tiempo máximo de espera para una petición
    headers: {
        'Content-Type': 'application/json',
    },
});

export default client;
