import { Router } from 'express'
import UsuarioControlador from '../controle/usuarioControle';

const usuarioRota = Router()
const controlador = new UsuarioControlador();

usuarioRota.get('/', controlador.todos);
usuarioRota.get('/:id', controlador.porId);
usuarioRota.post('/', controlador.criar);
usuarioRota.put('/', controlador.atualizar);
usuarioRota.delete('/:id', controlador.remover);

export default usuarioRota;
