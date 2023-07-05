import { Comercio, PrismaClient } from "@prisma/client";

export default class ComercioRepositorio {
  private static repositorio = new PrismaClient().comercio;

  todos() {
    return ComercioRepositorio.repositorio.findMany();
  }

  porId(id: number) {
    return ComercioRepositorio.repositorio.findUnique({ where: { id } });
  }

  criar(comercio: Comercio) {
    return ComercioRepositorio.repositorio.create({ data: comercio })
  }

  atualizar(comercio: Comercio) {
    return ComercioRepositorio.repositorio.update({
      where: { id: comercio.id },
      data: comercio
    });
  }

  remover(id: number) {
    return ComercioRepositorio.repositorio.delete({ where: { id } });
  }

  porCnpj(cnpj: string) {
    return ComercioRepositorio.repositorio.findUnique({ where: { cnpj } });
  }
}
