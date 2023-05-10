import ErroNegocio from "../arquitetura/ErroNegocio";
import ServicoEscrita from "../arquitetura/ServicoEscrita";
import Validacao from "../arquitetura/Validacao";
import ValidadorEntidade from "../arquitetura/ValidadorEntidade";
import Lote from "../entidade/Lote";
import LoteRepositorio from "../repositorio/LoteRepositorio";
import ProdutoRepositorio from "../repositorio/ProdutoRepositorio";
import UsuarioRepositorio from "../repositorio/UsuarioRepositorio";

class LoteServico implements ServicoEscrita<Lote> {
  private static repositorio = new LoteRepositorio();
  private static usuarioRepositorio = new UsuarioRepositorio();
  private static produtoRepositorio = new ProdutoRepositorio();

  private static validadorLote: ValidadorEntidade = {
    validacoesSincronas: {
      'quantidadeInicial': Validacao.vazio,
      'quantidadeAtual': Validacao.vazio,
      'validade': (validade) => null,
      'compradoEm': (compradoEm) => null,
      'custo': Validacao.precoPositivo,
      'precoVenda': Validacao.precoPositivo,
      'precoVendaPromocao': Validacao.precoPositivo,
      'emPromocao': Validacao.vazio,
    },
    validacoesAssincronas: {
      'idCriador': (id) => Validacao.entidadeFoiInformada(Number(id), LoteServico.usuarioRepositorio.porId, true),
      'idProduto': (id) => Validacao.entidadeFoiInformada(Number(id), LoteServico.produtoRepositorio.porId, true),
    }
  };

  validarCadastro(lote: Lote): Promise<ErroNegocio | null> {
    return Validacao.validar(LoteServico.validadorLote, lote, false);
  }

  validarAtualizacao(lote: Lote): Promise<ErroNegocio | null> {
    return Validacao.validar(LoteServico.validadorLote, lote, true);
  }

  todos(): Promise<Lote[]> {
    return LoteServico.repositorio.todos();
  }

  porId(id: number): Promise<Lote | null> {
    return LoteServico.repositorio.porId(id);
  }

  async criar(lote: Lote): Promise<Lote> {
    const retorno = await this.validarCadastro(lote);
    if (retorno === null) {
      return await LoteServico.repositorio.criar(lote);
    }
    throw retorno;
  }

  async atualizar(lote: Lote): Promise<Lote> {
    const retorno = await this.validarAtualizacao(lote);
    if (retorno === null) {
      return await LoteServico.repositorio.atualizar(lote);
    }
    throw retorno;
  }

  remover(id: number): Promise<Lote | null> {
    return LoteServico.repositorio.remover(id);
  }
}

export default LoteServico;
