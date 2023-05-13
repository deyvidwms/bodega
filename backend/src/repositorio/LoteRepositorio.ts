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

  porPeriodo(inicio: Date, fim: Date) {
    return LoteRepositorio.repositorio.findMany({ where: { compradoEm: { gte: inicio, lte: fim } } });
  }

  async produtosComBaixoEstoque(limite: number) {
    const idProdutos = await LoteRepositorio.repositorio.groupBy({
      by: ['idProduto'],
      _sum: { quantidadeAtual: true },
      where: { quantidadeAtual: { lte: limite } }
    }).then((res) => (res.map(i => i.idProduto)));
    return idProdutos;
  }

  public static async avisoValidade() {
    const tresMesesEmMillis = 90 * 24 * 60 * 60 * 1000; // 90 dias em milissegundos
    const dataAtual = new Date();
    const lotes = await LoteRepositorio.repositorio.findMany();
    for (let i = 0; i < lotes.length; i++) {
      const lote = lotes[i];
      if (lote.validade !== null) {
        const diff = lote.validade.getTime() - dataAtual.getTime();
        if (diff < tresMesesEmMillis) {
          console.log(`ALERTA: Lote ${lote.id} com validade próxima (${Math.round(diff / (24 * 60 * 60 * 1000))} dias)`);
        }
      }
    }
  }
}
