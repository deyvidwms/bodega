import { Router } from 'express';
import BodegaControle from '../controle/bodegaControle';

const bodegaRota = Router()
const controle = new BodegaControle();

bodegaRota.get('/', controle.todos);
bodegaRota.get('/:id', controle.porId);
bodegaRota.post('/', controle.criar);
bodegaRota.put('/', controle.atualizar);
bodegaRota.delete('/:id', controle.remover);

bodegaRota.get('/financeiro', controle.relatorioFinanceiro); //pode pedir o relatorio de x dias atrás

export default bodegaRota;
