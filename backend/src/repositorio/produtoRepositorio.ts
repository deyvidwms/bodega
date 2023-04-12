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

  async criar(produto: Produto) {
    return await ProdutoRepositorio.repositorio.create({ data: produto })
  }

  async atualizar(produto: Produto) {
    return ProdutoRepositorio.repositorio.update({
      where: { id: produto.id },
      data: produto
    });
  }

  async remover(id: number) {
    return await ProdutoRepositorio.repositorio.delete({ where: { id } });
  }
}

export default ProdutoRepositorio;
