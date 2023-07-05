import express, { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import loginRota from '../rota/loginRota';
import rota from '../rota';
import ErroNegocio from './ErroNegocio';

const cors = require('cors');

const _ = new PrismaClient();

const app = express();

export default class Inicializador {
  public iniciar(porta: any): void {
    app.use(express.json());
    app.use(cors());
    app.use(loginRota);
    app.use(rota);

    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      if (err instanceof ErroNegocio) {
        res.status(400).json({ erros: err.getErros() });
        return;
      }
      console.log(err);
      res.status(400).json({ erros: ['Houve um erro ao processar a sua requisição'] });
    });

    app.listen(porta, () => {
      console.log(`Iniciou na porta ${porta}`);
    });
  }
}
