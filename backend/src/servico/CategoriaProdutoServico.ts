import ErroNegocio from "../arquitetura/ErroNegocio";
import ServicoEscrita from "../arquitetura/ServicoEscrita";
import Validacao from "../arquitetura/Validacao";
import ValidadorEntidade from "../arquitetura/ValidadorEntidade";
import CategoriaProduto from "../entidade/CategoriaProduto";
import CategoriaProdutoRepositorio from "../repositorio/CategoriaProdutoRepositorio";

class CategoriaProdutoServico implements ServicoEscrita<CategoriaProduto> {
  private static repositorio = new CategoriaProdutoRepositorio();

  private static validadorCategoriaProduto: ValidadorEntidade = {
    validacoesSincronas: {
      'nome': Validacao.vazio,
      'imagem': Validacao.vazio,
    },
    validacoesAssincronas: {},
  };

  validar(categoriaProduto: CategoriaProduto): Promise<ErroNegocio | null> {
    return Validacao.validar(CategoriaProdutoServico.validadorCategoriaProduto, categoriaProduto);
  }

  todos(): Promise<CategoriaProduto[]> {
    return CategoriaProdutoServico.repositorio.todos();
  }

  porId(id: number): Promise<CategoriaProduto | null> {
    return CategoriaProdutoServico.repositorio.porId(id);
  }

  async criar(categoriaProduto: CategoriaProduto): Promise<CategoriaProduto> {
    const retorno = await this.validar(categoriaProduto);
    if (retorno === null) {
      return await CategoriaProdutoServico.repositorio.criar(categoriaProduto);
    }
    throw retorno;
  }

  async atualizar(categoriaProduto: CategoriaProduto): Promise<CategoriaProduto> {
    const retorno = await this.validar(categoriaProduto);
    if (retorno === null) {
      return await CategoriaProdutoServico.repositorio.atualizar(categoriaProduto);
    }
    throw retorno;
  }

  remover(id: number): Promise<CategoriaProduto | null> {
    return CategoriaProdutoServico.repositorio.remover(id);
  }
}

export default CategoriaProdutoServico;
