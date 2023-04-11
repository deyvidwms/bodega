import { PrismaClient } from "@prisma/client";
import Produto from "../entidade/Produto";

class ProdutoRepositorio {
  private static repositorio = new PrismaClient().produto;

  // GET ALL
  async todos() {
    return await ProdutoRepositorio.repositorio.findMany();
  }

  // GET SPECIFIC
  async porId(id: number) {
    return ProdutoRepositorio.repositorio.findUnique({ where: { id } });
  }

  // CREATE
  async criar(produto: Produto) {
    return await ProdutoRepositorio.repositorio.create({ data: produto })
  }

  // UPDATE
  async atualizar(produto: Produto) {
    return ProdutoRepositorio.repositorio.update({
      where: { id: produto.id },
      data: produto
    });
  }

  // DELETE
  async remover(id: number) {
    return await ProdutoRepositorio.repositorio.delete({ where: { id } });
  }
}

export default ProdutoRepositorio;