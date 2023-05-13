import express, { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import rota from './rota';
import ErroNegocio from './arquitetura/ErroNegocio';

const cors = require('cors');

const prisma = new PrismaClient();

const app = express();
const PORTA = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(rota);
app.use((req: Request, res: Response, next: NextFunction) => {
  const dataFormatada = new Date().toLocaleString('en-GB', { hour12: false });
  console.log(`[${dataFormatada}] Requisição ${req.method} recebida`)
  console.log('Params:', req.params);
  console.log('Body:', req.body);
  next();
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ErroNegocio) {
    res.status(400).json({ erros: err.getErros() });
    return;
  }
  res.status(400).json({
    erros: ['Houve um erro ao processar a sua requisição'],
    stacktrace: err.message,
  });
});

app.listen(PORTA, () => {
  console.log(`Iniciou na porta ${PORTA}`);
});
