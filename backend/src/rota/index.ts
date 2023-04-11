import { Router } from "express";
import usuarioRota from "./usuarioRota";

const rota = Router();

rota.use('/usuario', usuarioRota);

export default rota;