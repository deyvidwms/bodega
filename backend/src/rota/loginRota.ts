import { NextFunction, Request, Response, Router } from 'express';
import UsuarioControle from '../controle/UsuarioControle';

const loginRota = Router();

loginRota.use((req: Request, res: Response, next: NextFunction) => {
  const dataFormatada = new Date().toLocaleString('en-GB', { hour12: false });
  console.log(`[${dataFormatada}] Requisição ${req.method} recebida na rota "${req.originalUrl}"`)
  console.log('Params:', req.params);
  console.log('Body:', req.body);
  next();
});

loginRota.get('/login', UsuarioControle.login);

export default loginRota;
