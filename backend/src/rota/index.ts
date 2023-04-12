import { Router } from "express";
import categoriaProdutoRota from "./categoriaProdutoRota";
import loteRota from "./loteRota";
import produtoRota from "./produtoRota";
import usuarioRota from "./usuarioRota";
import vendaRota from "./vendaRota";
import bodegaRota from "./bodegaRota";

const rota = Router();

rota.use('/bodega', bodegaRota);
rota.use('/categoria-produto', categoriaProdutoRota);
rota.use('/lote', loteRota);
rota.use('/produto', produtoRota);
rota.use('/usuario', usuarioRota);
rota.use('/venda', vendaRota);

export default rota;
