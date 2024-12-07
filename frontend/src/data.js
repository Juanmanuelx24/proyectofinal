// src/data.js
//Vamos a crear un archivo en src/data.js donde simulemos las salas, usuarios y reservas:
export const usuarios = [
  {
    id: 1,
    nombre: "Administrador",
    email: "admin@ejemplo.com",
    password: "admin123",  // Contraseña en texto claro (en un entorno real nunca deberías almacenar contraseñas en texto claro)
    rol: "admin"           // Rol del usuario
  },
  {
    id: 2,
    nombre: "Usuario Normal",
    email: "usuario@ejemplo.com",
    password: "usuario123",
    rol: "usuario"         // Rol del usuario
  }
];

export const salas = [
  { id: 1, nombre: "Sala 1", capacidad: 100, estado: "Activa", ubicacion: "Cali" },
  { id: 2, nombre: "Sala 2", capacidad: 50, estado: "Inactiva", ubicacion: "Bogotá" },
  { id: 3, nombre: "Sala 3", capacidad: 75, estado: "Ocupada", ubicacion: "Medellín" },
];

export const reservas = [
  // { id: 1, salaId: 1, usuarioId: 1, fechaInicio: "2024-12-05 10:00", fechaFin: "2024-12-05 12:00", estado: "Activo" },
];
  