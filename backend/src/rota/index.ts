import { Router } from "express";
import usuarioRota from "./usuarioRota";
import produtoRota from "./produtoRota";

const rota = Router();

rota.use('/usuario', usuarioRota);
rota.use('/produto', produtoRota);

export default rota;