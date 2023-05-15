import { Router } from 'express';
import LoteControle from '../controle/LoteControle';

const loteRota = Router();
const controle = new LoteControle();

loteRota.get('/', controle.todos);
loteRota.get('/:id', controle.porId);
loteRota.post('/', controle.criar);
loteRota.put('/', controle.atualizar);
loteRota.delete('/:id', controle.remover);
loteRota.get('/baixa-validade', controle.comBaixaValidade);

export default loteRota;
