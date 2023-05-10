import { PrismaClient } from "@prisma/client";
import Produto from "../entidade/Produto";

class ProdutoRepositorio {
  private static repositorio = new PrismaClient().produto;

  async todos() {
    return await ProdutoRepositorio.repositorio.findMany();
  }

  async porId(id: number) {
    return ProdutoRepositorio.repositorio.findUnique({ where: { id } });
  }

  async porIds(ids: number[]) {
    return ProdutoRepositorio.repositorio.findMany({
      where: {
        id: { in: ids }
      }
    });
  }

  async criar(produto: Produto) {
    produto.idCategoriaProduto = Number(produto.idCategoriaProduto);
    return await ProdutoRepositorio.repositorio.create({ data: produto })
  }

  async atualizar(produto: Produto) {
    produto.idCategoriaProduto = Number(produto.idCategoriaProduto);
    return ProdutoRepositorio.repositorio.update({
      where: { id: produto.id },
      data: produto
    });
  }

  async remover(id: number) {
    return await ProdutoRepositorio.repositorio.delete({ where: { id } });
  }

  async encarte(idBodega: number) {
    return await ProdutoRepositorio.repositorio.findMany({
      include: { lotes: { where: { AND: { emPromocao: true, quantidadeAtual: { gt: 0 } } } } },
      where: {
        lotes: { some: { AND: { emPromocao: true, quantidadeAtual: { gt: 0 } } }, },
        criador: { idBodega: { equals: idBodega } },
      },
    });
  }
}

export default ProdutoRepositorio;
