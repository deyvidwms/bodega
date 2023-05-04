import ServicoEscrita from "../arquitetura/ServicoEscrita";
import Validacao from "../arquitetura/Validacao";
import ValidadorAtributo from "../arquitetura/ValidadorAtributo";
import CategoriaProduto from "../entidade/CategoriaProduto";
import CategoriaProdutoRepositorio from "../repositorio/CategoriaProdutoRepositorio";

class CategoriaProdutoServico implements ServicoEscrita<CategoriaProduto> {
  private static repositorio = new CategoriaProdutoRepositorio();

  private static validadorCategoriaProduto: ValidadorAtributo = {
    'nome': (nome) => Validacao.vazio('Nome', nome),
    'imagem': (imagem) => Validacao.vazio('Imagem', imagem),
  };

  validar(categoriaProduto: CategoriaProduto): void {
    Validacao.validar(CategoriaProdutoServico.validadorCategoriaProduto, categoriaProduto);
  }

  todos(): Promise<CategoriaProduto[]> {
    return CategoriaProdutoServico.repositorio.todos();
  }

  porId(id: number): Promise<CategoriaProduto | null> {
    return CategoriaProdutoServico.repositorio.porId(id);
  }

  async criar(categoriaProduto: CategoriaProduto): Promise<CategoriaProduto> {
    this.validar(categoriaProduto);
    return await CategoriaProdutoServico.repositorio.criar(categoriaProduto);
  }

  atualizar(categoriaProduto: CategoriaProduto): Promise<CategoriaProduto> {
    this.validar(categoriaProduto);
    return CategoriaProdutoServico.repositorio.atualizar(categoriaProduto);
  }

  remover(id: number): Promise<CategoriaProduto | null> {
    return CategoriaProdutoServico.repositorio.remover(id);
  }
}

export default CategoriaProdutoServico;
