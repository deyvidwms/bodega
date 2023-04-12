import { Router } from 'express'
import CategoriaProdutoControle from '../controle/categoriaProdutoControle';

const categoriaProdutoRota = Router()
const controle = new CategoriaProdutoControle();

categoriaProdutoRota.get('/', controle.todos);
categoriaProdutoRota.get('/:id', controle.porId);
categoriaProdutoRota.post('/', controle.criar);
categoriaProdutoRota.put('/', controle.atualizar);
categoriaProdutoRota.delete('/:id', controle.remover);

export default categoriaProdutoRota;
