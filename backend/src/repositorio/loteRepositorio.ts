import { PrismaClient } from "@prisma/client";
import Lote from "../entidade/Lote";

class LoteRepositorio {
  private static repositorio = new PrismaClient().lote;

  // GET ALL
  async todos() {
    return await LoteRepositorio.repositorio.findMany();
  }

  // GET SPECIFIC
  async porId(id: number) {
    return LoteRepositorio.repositorio.findUnique({ where: { id } });
  }

  // CREATE
  async criar(lote: Lote) {
    return await LoteRepositorio.repositorio.create({ data: lote })
  }

  // UPDATE
  async atualizar(lote: Lote) {
    return LoteRepositorio.repositorio.update({
      where: { id: lote.id },
      data: lote
    });
  }

  // DELETE
  async remover(id: number) {
    return await LoteRepositorio.repositorio.delete({ where: { id } });
  }
}

export default LoteRepositorio;
