import { PrismaClient } from "@prisma/client";
import Lote from "../entidade/Lote";
import Usuario from "../entidade/Usuario";
import Produto from "../entidade/Produto";

class LoteRepositorio {
  static verificarValidades() {
    throw new Error('Method not implemented.');
  }
  private static repositorio = new PrismaClient().lote;
  static verificarValidade: any;

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

export default LoteRepositorio;
