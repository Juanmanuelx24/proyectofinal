import {TOKENSECRET} from '../config/db.js';
import jwt from 'jsonwebtoken'
export function createAccesToken(payload){
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            TOKENSECRET,
            {
            expiresIn: "1d",
            },
            (err,token) => {
                if(err) reject(err);
                resolve(token);       
            }
      ); 
    })
}

export const authRequired = (req, res, next) => {
    try {
      const { token } = req.cookies;
      if (!token) {
        return res.status(401).json({ message: 'El token no está autorizado.' });
      }

      jwt.verify(token, TOKENSECRET, (err, user) => {
        if (err) {
          return res.status(403).json({ message: 'Token inválido.' });
        }
        req.user = user;
        next();
      });
    } catch (error) {
      return res.status(500).json({ message: 'Error interno del servidor.' });
    }
  };
  export const isAdmin = (req, res, next) => {
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];
    if (!token) {
      return res.status(403).json({ message: 'Acceso denegado. No se encontró token.' });
    }
    try {
    
      const decoded = jwt.verify(token, process.env.TOKENSECRET);
      req.user = decoded; 
  
      if (req.user.rol !== 'Admin') {
        return res.status(403).json({ message: 'Acceso denegado. Solo los administradores pueden acceder a esta ruta.' });
      }
  
      next(); 
    } catch (error) {
      res.status(401).json({ message: 'Token inválido o expirado.' });
    }
  };
  