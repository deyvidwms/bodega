import { PrismaClient } from "@prisma/client";
import Lote from "../entidade/Lote";

export default class LoteRepositorio {
  private static repositorio = new PrismaClient().lote;

  todos() {
    return LoteRepositorio.repositorio.findMany({ include: { produto: true } });
  }

  porId(id: number) {
    return LoteRepositorio.repositorio.findUnique({ where: { id } });
  }

  criar(lote: Lote) {
    return LoteRepositorio.repositorio.create({ data: lote });
  }

  atualizar(lote: Lote) {
    return LoteRepositorio.repositorio.update({
      where: { id: lote.id },
      data: lote
    });
  }

  remover(id: number) {
    return LoteRepositorio.repositorio.delete({ where: { id } });
  }

  porPeriodo(id: number, inicio: Date, fim: Date) {
    return LoteRepositorio.repositorio.findMany({
      where: {
        compradoEm: { gte: inicio, lte: fim },
        criador: { idBodega: id },
      }
    });
  }

  async produtosComBaixoEstoque(limite: number) {
    const idProdutos = await LoteRepositorio.repositorio.groupBy({
      by: ['idProduto'],
      _sum: { quantidadeAtual: true },
      where: { quantidadeAtual: { lte: limite } }
    }).then((res) => (res.map(i => i.idProduto)));
    return idProdutos;
  }

  public findComBaixaValidade(idBodega: number, dataLimite: Date) {
    return LoteRepositorio.repositorio.findMany({
      where: {
        AND: {
          validade: { lte: dataLimite },
          produto: { idBodega: idBodega }
        }
      }
    });
  }
}
