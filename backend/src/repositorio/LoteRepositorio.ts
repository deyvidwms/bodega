import { PrismaClient } from "@prisma/client";
import Lote from "../entidade/Lote";
import Usuario from "../entidade/Usuario";
import Produto from "../entidade/Produto";

class LoteRepositorio {
  private static repositorio = new PrismaClient().lote;

  async todos() {
    return await LoteRepositorio.repositorio.findMany({
      include: { produto: true },
    });
  }

  async porId(id: number) {
    return LoteRepositorio.repositorio.findUnique({ where: { id } });
  }

  async criar(lote: Lote) {
    console.log(lote);
    return await LoteRepositorio.repositorio.create({ data: lote });
  }

  async atualizar(lote: Lote) {
    return LoteRepositorio.repositorio.update({
      where: { id: lote.id },
      data: lote
    });
  }

  async remover(id: number) {
    return await LoteRepositorio.repositorio.delete({ where: { id } });
  }

  async porPeriodo(inicio: Date, fim: Date) {
    //retorna a lista por periodo
    return await LoteRepositorio.repositorio.findMany({ where: { compradoEm: { gte: inicio, lte: fim } } });
  }

  async produtosComBaixoEstoque(limite: number) {
    const idProdutos = await LoteRepositorio.repositorio.groupBy({
      by: ['idProduto'],
      _sum: { quantidadeAtual: true },
      where: { quantidadeAtual: { lte: limite } }
    }).then((res) => (res.map(i => i.idProduto)));
    return idProdutos;
  }
}

export default LoteRepositorio;
