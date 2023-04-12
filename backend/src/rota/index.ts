import { Router } from "express";
import loteRota from "./loteRota";
import produtoRota from "./produtoRota";
import usuarioRota from "./usuarioRota";
import vendaRota from "./vendaRota";

const rota = Router();

rota.use('/lote', loteRota);
rota.use('/produto', produtoRota);
rota.use('/usuario', usuarioRota);
rota.use('/venda', vendaRota);

export default rota;
