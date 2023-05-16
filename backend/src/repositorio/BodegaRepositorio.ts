import { PrismaClient } from "@prisma/client";
import Bodega from "../entidade/Bodega";

export default class BodegaRepositorio {
  private static repositorio = new PrismaClient().bodega;

  todos() {
    return BodegaRepositorio.repositorio.findMany();
  }

  porId(id: number) {
    return BodegaRepositorio.repositorio.findUnique({ where: { id } });
  }

  criar(bodega: Bodega) {
    return BodegaRepositorio.repositorio.create({ data: bodega })
  }

  atualizar(bodega: Bodega) {
    return BodegaRepositorio.repositorio.update({
      where: { id: bodega.id },
      data: bodega
    });
  }

  remover(id: number) {
    return BodegaRepositorio.repositorio.delete({ where: { id } });
  }

  porCnpj(cnpj: string) {
    return BodegaRepositorio.repositorio.findUnique({ where: { cnpj } });
  }
}
