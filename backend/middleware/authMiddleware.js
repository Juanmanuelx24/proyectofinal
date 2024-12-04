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
    const {token} = req.cookies;
    if(!token) return res.status(401).json({message:'El token no esta autorizado.'});
    jwt.verify(token, TOKENSECRET,(err,user) => {
        if(err) return res.status(403).json({message: 'Token invalido.'});
        req.user = user;

        next();
    })
}