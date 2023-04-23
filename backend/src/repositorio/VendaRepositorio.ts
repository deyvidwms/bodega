import { PrismaClient } from "@prisma/client";
import Venda from "../entidade/Venda";

class VendaRepositorio {
  private static repositorio = new PrismaClient().venda;

  async todos() {
    return await VendaRepositorio.repositorio.findMany();
  }

  async porId(id: number) {
    return VendaRepositorio.repositorio.findUnique({ where: { id } });
  }

  async criar(venda: Venda) {
    return await VendaRepositorio.repositorio.create({ data: venda })
  }

  async atualizar(venda: Venda) {
    return VendaRepositorio.repositorio.update({
      where: { id: venda.id },
      data: venda
    });
  }

  async remover(id: number) {
    return await VendaRepositorio.repositorio.delete({ where: { id } });
  }

  async porPeriodo(inicio: Date, fim: Date) {
    return await VendaRepositorio.repositorio.findMany({
      where: { vendidoEm: { gte: inicio, lte: fim } },
      include: { vendaLotes: true },
    });
  }
}

export default VendaRepositorio;
