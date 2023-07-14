import express, { NextFunction, Request, Response, Router } from "express";
import path from 'path';
import comercioRota from "./comercioRota";
import categoriaProdutoRota from "./categoriaProdutoRota";
import loteRota from "./loteRota";
import pessoaRota from "./pessoaRota";
import produtoRota from "./produtoRota";
import usuarioRota from "./usuarioRota";
import vendaRota from "./vendaRota";
import vendaLoteRota from "./vendaLoteRota";

import jwt from 'jsonwebtoken';

const rota = Router();

rota.use((req: Request, res: Response, next: NextFunction) => {
  const dataFormatada = new Date().toLocaleString('en-GB', { hour12: false });
  console.log(`[${dataFormatada}] Requisição ${req.method} recebida na rota "${req.originalUrl}"`)
  console.log('Params:', req.params);
  console.log('Body:', req.body);
  next();
});

rota.use((req: any, res: any, next: any) => {
  // const token = req.headers['x-access-token'];
  // if (!token) {
  //   return res.status(401).json({ autenticado: false, mensagem: 'Token não foi informado' });
  // }

  // const chave = process.env.TOKEN_PASS;
  // if (chave === undefined) {
  //   console.error('Chave token não definida. Defina a variável "TOKEN_PASS" no arquivo .env');
  // } else {
  //   jwt.verify(token, chave, (err: any, decoded: any) => {
  //     if (err) {
  //       return res.status(500).json({ autenticado: false, mensagem: 'Falha ao autenticar token' });
  //     }
  //     req.userId = decoded.id;
  //   });
  // }
  next();
});

rota.use('/comercio', comercioRota);
rota.use('/categoria-produto', categoriaProdutoRota);
rota.use('/lote', loteRota);
rota.use('/pessoa', pessoaRota);
rota.use('/produto', produtoRota);
rota.use('/usuario', usuarioRota);
rota.use('/venda', vendaRota);
rota.use('/venda-lote', vendaLoteRota);
rota.use('/reports', express.static(path.join(__dirname, '../../../reports')));

export default rota;
