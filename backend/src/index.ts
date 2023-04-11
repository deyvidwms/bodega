import express from 'express';
import { PrismaClient } from '@prisma/client';

import rota from './rota';

const app = express();
const PORTA = process.env.PORT;
const prisma = new PrismaClient()

app.use(express.json())
app.use(rota);

app.listen(PORTA, () => {
  console.log(`Iniciou na porta ${PORTA}`);
});
