import { Router } from 'express'
import VendaControle from '../controle/VendaControle';

const vendaLoteRota = Router()
const controle = new VendaControle();

vendaLoteRota.get('/', controle.todos);
vendaLoteRota.get('/:id', controle.porId);
vendaLoteRota.post('/', controle.criar);
vendaLoteRota.put('/', controle.atualizar);
vendaLoteRota.delete('/:id', controle.remover);

export default vendaLoteRota;
