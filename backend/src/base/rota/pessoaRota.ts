import { Router } from 'express'
import PessoaControle from '../controle/PessoaControle';

const pessoaRota = Router()
const controle = new PessoaControle();

pessoaRota.get('/', controle.todos);
pessoaRota.get('/:id', controle.porId);
pessoaRota.post('/', controle.criar);
pessoaRota.put('/', controle.atualizar);
pessoaRota.delete('/:id', controle.remover);

export default pessoaRota;
