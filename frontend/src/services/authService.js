// services/authService.js
import { usuarios } from '../data';  // Importamos los datos de los usuarios

export const login = (email, password) => {
  // Buscar al usuario por email
  const usuario = usuarios.find(user => user.email === email);
  
  if (usuario && usuario.password === password) {
    // Si el usuario existe y la contraseña es correcta, devolver el usuario
    return { 
      id: usuario.id, 
      nombre: usuario.nombre, 
      email: usuario.email, 
      rol: usuario.rol 
    };
  } else {
    // Si no existe o la contraseña es incorrecta, devolver null o un error
    return null;
  }
};
