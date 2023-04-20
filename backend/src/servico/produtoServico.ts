import Produto from "../entidade/Produto";
import LoteRepositorio from "../repositorio/loteRepositorio";
import ProdutoRepositorio from "../repositorio/produtoRepositorio";

class ProdutoServico {
  private static repositorio = new ProdutoRepositorio();
  private static loteRepositorio = new LoteRepositorio();

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
    return ProdutoServico.repositorio.remover(id);
  }

  async produtosComBaixoEstoque(limite: number): Promise<Produto[]> {
    const ids = await ProdutoServico.loteRepositorio.produtosComBaixoEstoque(limite);
    return ProdutoServico.repositorio.porIds(ids);
  }
}

export default ProdutoServico;
