import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const cors = require('cors');

import rota from './rota';
import LoteRepositorio from './repositorio/LoteRepositorio';

const app = express();
const PORTA = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(rota);

app.listen(PORTA, async () => {
  console.log(`Iniciou na porta ${PORTA}`);
  await LoteRepositorio.avisoValidade();
});
