import { Router } from 'express';
import BodegaControle from '../controle/BodegaControle';

const bodegaRota = Router()
const controle = new BodegaControle();

bodegaRota.get('/', controle.todos);
bodegaRota.get('/:id', controle.porId);
bodegaRota.post('/', controle.criar);
bodegaRota.put('/', controle.atualizar);
bodegaRota.delete('/:id', controle.remover);
bodegaRota.get('/encarte/:id', controle.encarte);
bodegaRota.get('/financeiro/:id', controle.relatorioFinanceiro);

export default bodegaRota;
