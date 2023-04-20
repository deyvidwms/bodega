import { Router } from "express";
import bodegaRota from "./bodegaRota";
import categoriaProdutoRota from "./categoriaProdutoRota";
import loteRota from "./loteRota";
import pessoaRota from "./pessoaRota";
import produtoRota from "./produtoRota";
import usuarioRota from "./usuarioRota";
import vendaRota from "./vendaRota";

const rota = Router();

rota.use('/bodega', bodegaRota);
rota.use('/categoria-produto', categoriaProdutoRota);
rota.use('/lote', loteRota);
rota.use('/pessoa', pessoaRota);
rota.use('/produto', produtoRota);
rota.use('/usuario', usuarioRota);
rota.use('/venda', vendaRota);

export default rota;
