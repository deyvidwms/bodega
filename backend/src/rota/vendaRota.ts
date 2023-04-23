import { Router } from 'express'
import VendaControle from '../controle/VendaControle';

const vendaRota = Router()
const controle = new VendaControle();

vendaRota.get('/', controle.todos);
vendaRota.get('/:id', controle.porId);
vendaRota.post('/', controle.criar);
vendaRota.put('/', controle.atualizar);
vendaRota.delete('/:id', controle.remover);

export default vendaRota;
