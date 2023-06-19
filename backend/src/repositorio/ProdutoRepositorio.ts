import { PrismaClient } from "@prisma/client";
import Produto from "../entidade/Produto";

export default class ProdutoRepositorio {
  private static repositorio = new PrismaClient().produto;

  todos() {
    return ProdutoRepositorio.repositorio.findMany();
  }

  porId(id: number) {
    return ProdutoRepositorio.repositorio.findUnique({ where: { id } });
  }

  criar(produto: Produto) {
    return ProdutoRepositorio.repositorio.create({ data: produto })
  }

  atualizar(produto: Produto) {
    return ProdutoRepositorio.repositorio.update({
      where: { id: produto.id },
      data: produto
    });
  }

  remover(id: number) {
    return ProdutoRepositorio.repositorio.delete({ where: { id } });
  }

  porIds(ids: number[]) {
    return ProdutoRepositorio.repositorio.findMany({
      where: {
        id: { in: ids }
      }
    });
  }

  encarte(idComercio: number) {
    return ProdutoRepositorio.repositorio.findMany({
      include: { lotes: { where: { AND: { emPromocao: true, quantidadeAtual: { gt: 0 } } } } },
      where: {
        lotes: { some: { AND: { emPromocao: true, quantidadeAtual: { gt: 0 } } }, },
        criador: { idComercio: { equals: idComercio } },
      },
    });
  }
}
