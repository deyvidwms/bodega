import ServicoEscrita from "../arquitetura/ServicoEscrita";
import Validacao from "../arquitetura/Validacao";
import ValidadorAtributo from "../arquitetura/ValidadorAtributo";
import Lote from "../entidade/Lote";
import LoteRepositorio from "../repositorio/LoteRepositorio";
import PessoaRepositorio from "../repositorio/PessoaRepositorio";
import ProdutoRepositorio from "../repositorio/ProdutoRepositorio";

class LoteServico implements ServicoEscrita<Lote> {
  private static repositorio = new LoteRepositorio();
  private static pessoaRepositorio = new PessoaRepositorio();
  private static produtoRepositorio = new ProdutoRepositorio();

  private static validadorLote: ValidadorAtributo = {
    'quantidadeInicial': (quantidadeInicial) => Validacao.vazio('Quantidade inicial', quantidadeInicial),
    'quantidadeAtual': (quantidadeAtual) => Validacao.vazio('Quantidade atual', quantidadeAtual),
    'compradoEm': (compradoEm) => null,
    'custo': (custo) => null,
    'idCriador': (id) => Validacao.entidadeFoiInformada('Criador', id, LoteServico.pessoaRepositorio.porId, true),
    'idProduto': (id) => Validacao.entidadeFoiInformada('Produto', id, LoteServico.produtoRepositorio.porId, true),
  };

  validar(lote: Lote): void {
    Validacao.validar(LoteServico.validadorLote, lote);
  }

  todos(): Promise<Lote[]> {
    return LoteServico.repositorio.todos();
  }

  porId(id: number): Promise<Lote | null> {
    return LoteServico.repositorio.porId(id);
  }

  async criar(lote: Lote): Promise<Lote> {
    this.validar(lote);
    return await LoteServico.repositorio.criar(lote);
  }

  atualizar(lote: Lote): Promise<Lote> {
    this.validar(lote);
    return LoteServico.repositorio.atualizar(lote);
  }

  remover(id: number): Promise<Lote | null> {
    return LoteServico.repositorio.remover(id);
  }
}

export default LoteServico;
