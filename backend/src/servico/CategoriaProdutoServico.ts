import CategoriaProduto from "../entidade/CategoriaProduto";
import CategoriaProdutoRepositorio from "../repositorio/CategoriaProdutoRepositorio";

class CategoriaProdutoServico {
  private static repositorio = new CategoriaProdutoRepositorio();

  todos(): Promise<CategoriaProduto[]> {
    return CategoriaProdutoServico.repositorio.todos();
  }

  porId(id: number): Promise<CategoriaProduto | null> {
    return CategoriaProdutoServico.repositorio.porId(id);
  }

  async criar(categoriaProduto: CategoriaProduto): Promise<CategoriaProduto> {
    return await CategoriaProdutoServico.repositorio.criar(categoriaProduto);
  }

  atualizar(categoriaProduto: CategoriaProduto): Promise<CategoriaProduto | null> {
    return CategoriaProdutoServico.repositorio.atualizar(categoriaProduto);
  }

  remover(id: number): Promise<CategoriaProduto | null> {
    return CategoriaProdutoServico.repositorio.remover(id);
  }
}

export default CategoriaProdutoServico;
