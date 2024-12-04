import User from '../models/Usuario.js';
import bcrypt from 'bcrypt';
import { createAccesToken } from '../middleware/authMiddleware.js';

export const register =  async (req, res) => {
    const {nombre,correo,contraseña,rol} = req.body;
    try {
      const newUser = new User({
        nombre,
        correo,
        contraseña,
        rol
      })
      const userSave = await newUser.save();
      const token = await createAccesToken({id: userSave._id})
      res.cookie('token',token);
      res.json({
        id: userSave._id,
        nombre: userSave.nombre, 
        correo: userSave.correo,
        rol: userSave.rol,
        createdAt: userSave.createdAt,
        updatedAt: userSave.updatedAt
      }); 
    } catch (error) {
      res.status(500).json({message: error.message});
    }
  };

export const login = async (req, res) => {
    const { correo, contraseña } = req.body;
  
    try {
      const userFound = await User.findOne({ correo });
      if (!userFound) return res.status(404).json({ message: 'Usuario no encontrado' });
  
      const isMatch = await bcrypt.compare(contraseña, userFound.contraseña);
      if (!isMatch) return res.status(401).json({ message: 'Contraseña incorrecta' });
  
      const token = await createAccesToken({ id: userFound._id });
      res.cookie('token', token);
      res.json({
        id: userFound._id,
        nombre: userFound.nombre,
        correo: userFound.correo,
        rol: userFound.rol,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

export const logout = (req,res) =>{
  res.cookie('token',"",{
    expires: new Date(0)
  })
  return res.sendStatus(200); 
}

export const profile = async (req,res) =>{
  const userFound = await User.findById(req.user._id);
  if(!userFound) return res.status(404).json({ message: 'El usuario no fue encontrado.'});
  return res.json({
    id: userFound._id,
    nombre: userFound.nombre,
    correo: userFound.correo,
    contraseña: userFound.contraseña,
    rol: userFound.rol
  });
}