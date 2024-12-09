import User from '../models/Usuario.js';
import { createAccesToken } from '../middleware/authMiddleware.js';

const ROL_TOKEN= process.env.ROL_TOKEN

export const register = async (req, res) => {
  const { nombre, correo, contraseña, rol } = req.body;

  try {
    const adminRole = rol === ROL_TOKEN ? 'Admin' : 'Usuario';
    const newUser = new User({
      nombre,
      correo,
      contraseña,
      rol: adminRole,  
    });

    const userSave = await newUser.save();
    const token = await createAccesToken({ id: userSave._id });

    res.cookie('token', token);

    res.status(201).json({
      message: `Usuario "${userSave.nombre}" creado exitosamente`,
      token,
      user: {
        id: userSave._id,
        nombre: userSave.nombre,
        correo: userSave.correo,
        rol: userSave.rol,  
        createdAt: userSave.createdAt,
        updatedAt: userSave.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const login = async (req, res) => {
  const { correo, contraseña } = req.body;

  try {
    const userFound = await User.findOne({ correo });
    if (!userFound) return res.status(404).json({ message: 'Usuario no encontrado' });

    const isMatch = await userFound.compararContraseña(contraseña);
    if (!isMatch) return res.status(401).json({ message: 'Contraseña incorrecta' });

    const token = await createAccesToken({ id: userFound._id });
    res.cookie('token', token);

    res.json({
      message: `Bienvenido ${userFound.nombre}, te has logeado exitosamente`,
      token,
      user: {
        id: userFound._id,
        nombre: userFound.nombre,
        correo: userFound.correo,
        rol: userFound.rol, 
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const logout = async (req, res) => {
  const { correo } = req.body; 
  try {
    const userFound = await User.findOne({ correo });
    if (!userFound) return res.status(404).json({ message: 'Usuario no encontrado.' });

    res.cookie('token', "", {
      expires: new Date(0),
      httpOnly: true, 
    });

    return res.json({ message: `Usuario "${userFound.nombre}" cerró sesión exitosamente` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const profile = async (req, res) => {
  try {
    const userFound = await User.findById(req.user.id);
    if (!userFound) return res.status(404).json({ message: 'El usuario no fue encontrado.' });

    return res.json({
      message: `Perfil creado por: ${userFound.nombre}`,
      user: {
        id: userFound._id,
        nombre: userFound.nombre,
        correo: userFound.correo,
        rol: userFound.rol,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

