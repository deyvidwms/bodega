import { Router } from 'express'
import ProdutoControle from '../controle/produtoControle';

const produtoRota = Router()
const controle = new ProdutoControle();

produtoRota.get('/', controle.todos);
produtoRota.get('/:id', controle.porId);
produtoRota.post('/', controle.criar);
produtoRota.put('/', controle.atualizar);
produtoRota.delete('/:id', controle.remover);

export default produtoRota;