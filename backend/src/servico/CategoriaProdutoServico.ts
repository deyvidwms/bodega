import ServicoEscrita from "../arquitetura/ServicoEscrita";
import Validacao from "../arquitetura/Validacao";
import ValidadorEntidade from "../arquitetura/ValidadorEntidade";
import CategoriaProduto from "../entidade/CategoriaProduto";
import CategoriaProdutoRepositorio from "../repositorio/CategoriaProdutoRepositorio";

export default class CategoriaProdutoServico implements ServicoEscrita<CategoriaProduto> {
  private static repositorio = new CategoriaProdutoRepositorio();

  private static validadorCategoriaProduto = new ValidadorEntidade(
    {
      'nome': Validacao.vazio,
      'imagem': Validacao.vazio,
    },
    {},
  );

  validarCadastro(categoriaProduto: CategoriaProduto): Promise<void> {
    return CategoriaProdutoServico.validadorCategoriaProduto.validar(categoriaProduto, false);
  }

  validarAtualizacao(categoriaProduto: CategoriaProduto): Promise<void> {
    return CategoriaProdutoServico.validadorCategoriaProduto.validar(categoriaProduto, true);
  }

  todos(): Promise<CategoriaProduto[]> {
    return CategoriaProdutoServico.repositorio.todos();
  }

  porId(id: number): Promise<CategoriaProduto | null> {
    return CategoriaProdutoServico.repositorio.porId(id);
  }

  async criar(categoriaProduto: CategoriaProduto): Promise<CategoriaProduto> {
    await this.validarCadastro(categoriaProduto);
    return CategoriaProdutoServico.repositorio.criar(categoriaProduto);
  }

  async atualizar(categoriaProduto: CategoriaProduto): Promise<CategoriaProduto> {
    await this.validarAtualizacao(categoriaProduto);
    return await CategoriaProdutoServico.repositorio.atualizar(categoriaProduto);
  }

  remover(id: number): Promise<CategoriaProduto | null> {
    return CategoriaProdutoServico.repositorio.remover(id);
  }
}
