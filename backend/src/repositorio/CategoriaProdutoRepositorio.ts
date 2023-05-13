import { PrismaClient } from "@prisma/client";
import CategoriaProduto from "../entidade/CategoriaProduto";

export default class CategoriaProdutoRepositorio {
  private static repositorio = new PrismaClient().categoriaProduto;

  todos() {
    return CategoriaProdutoRepositorio.repositorio.findMany();
  }

  porId(id: number) {
    return CategoriaProdutoRepositorio.repositorio.findUnique({ where: { id } });
  }

  criar(categoriaProduto: CategoriaProduto) {
    return CategoriaProdutoRepositorio.repositorio.create({ data: categoriaProduto })
  }

  atualizar(categoriaProduto: CategoriaProduto) {
    return CategoriaProdutoRepositorio.repositorio.update({
      where: { id: categoriaProduto.id },
      data: categoriaProduto
    });
  }

  remover(id: number) {
    return CategoriaProdutoRepositorio.repositorio.delete({ where: { id } });
  }
}
