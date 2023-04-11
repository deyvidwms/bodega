import { Router } from 'express'
import UsuarioControle from '../controle/usuarioControle';

const usuarioRota = Router()
const controle = new UsuarioControle();

usuarioRota.get('/', controle.todos);
usuarioRota.get('/:id', controle.porId);
usuarioRota.post('/', controle.criar);
usuarioRota.put('/', controle.atualizar);
usuarioRota.delete('/:id', controle.remover);

export default usuarioRota;
