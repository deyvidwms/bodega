import { PrismaClient } from "@prisma/client";
import Bodega from "../entidade/Bodega";

class BodegaRepositorio {
  private static repositorio = new PrismaClient().bodega;

  async todos() {
    return await BodegaRepositorio.repositorio.findMany();
  }

  async porId(id: number) {
    return BodegaRepositorio.repositorio.findUnique({ where: { id } });
  }

  async criar(bodega: Bodega) {
    return await BodegaRepositorio.repositorio.create({ data: bodega })
  }

  async atualizar(bodega: Bodega) {
    return BodegaRepositorio.repositorio.update({
      where: { id: bodega.id },
      data: bodega
    });
  }

  async remover(id: number) {
    return await BodegaRepositorio.repositorio.delete({ where: { id } });
  }
}

export default BodegaRepositorio;
