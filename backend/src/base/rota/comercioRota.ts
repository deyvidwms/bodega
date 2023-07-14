import { Router } from 'express';
import ComercioControle from '../controle/ComercioControle';

const comercioRota = Router()
const controle = new ComercioControle();

comercioRota.get('/', controle.todos);
comercioRota.get('/:id', controle.porId);
comercioRota.post('/', controle.criar);
comercioRota.put('/', controle.atualizar);
comercioRota.delete('/:id', controle.remover);
comercioRota.get('/encarte/:id', controle.encarte);
comercioRota.post('/financeiro/:id', controle.relatorioFinanceiro);

export default comercioRota;
