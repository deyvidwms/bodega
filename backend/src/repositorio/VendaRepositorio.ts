import { PrismaClient } from "@prisma/client";
import Venda from "../entidade/Venda";

export default class VendaRepositorio {
  private static repositorio = new PrismaClient().venda;

  todos() {
    return VendaRepositorio.repositorio.findMany();
  }

  porId(id: number) {
    return VendaRepositorio.repositorio.findUnique({ where: { id } });
  }

  criar(venda: Venda) {
    return VendaRepositorio.repositorio.create({ data: venda })
  }

  atualizar(venda: Venda) {
    return VendaRepositorio.repositorio.update({
      where: { id: venda.id },
      data: venda
    });
  }

  remover(id: number) {
    return VendaRepositorio.repositorio.delete({ where: { id } });
  }

  porPeriodo(inicio: Date, fim: Date) {
    return VendaRepositorio.repositorio.findMany({
      where: { vendidoEm: { gte: inicio, lte: fim } },
      include: { vendaLotes: true },
    });
  }
}
