import Produto from "../entidade/Produto";
import ProdutoRepositorio from "../repositorio/produtoRepositorio";

class ProdutoServico {
  private static repositorio = new ProdutoRepositorio();

  todos(): Promise<Produto[]> {
    return ProdutoServico.repositorio.todos();
  }

  porId(id: number): Promise<Produto | null> {
    return ProdutoServico.repositorio.porId(id);
  }

  async criar(produto: Produto): Promise<Produto> {
    // Validar produto

    return await ProdutoServico.repositorio.criar(produto);
  }

  atualizar(produto: Produto): Promise<Produto | null> {
    // Validar produto

    return ProdutoServico.repositorio.atualizar(produto);
  }

  remover(id: number): Promise<Produto | null> {
    console.log(id);
    return ProdutoServico.repositorio.remover(id);
  }
}

export default ProdutoServico;