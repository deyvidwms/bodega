import { PrismaClient } from "@prisma/client";
import CategoriaProduto from "../entidade/CategoriaProduto";

class CategoriaProdutoRepositorio {
  private static repositorio = new PrismaClient().categoriaProduto;

  async todos() {
    return await CategoriaProdutoRepositorio.repositorio.findMany();
  }

  async porId(id: number) {
    return CategoriaProdutoRepositorio.repositorio.findUnique({ where: { id } });
  }

  async criar(categoriaProduto: CategoriaProduto) {
    return await CategoriaProdutoRepositorio.repositorio.create({ data: categoriaProduto })
  }

  async atualizar(categoriaProduto: CategoriaProduto) {
    return CategoriaProdutoRepositorio.repositorio.update({
      where: { id: categoriaProduto.id },
      data: categoriaProduto
    });
  }

  async remover(id: number) {
    return await CategoriaProdutoRepositorio.repositorio.delete({ where: { id } });
  }
}

export default CategoriaProdutoRepositorio;
