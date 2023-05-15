import ServicoEscrita from "../arquitetura/ServicoEscrita";
import Validacao from "../arquitetura/Validacao";
import ValidadorEntidade from "../arquitetura/ValidadorEntidade";
import Lote from "../entidade/Lote";
import BodegaRepositorio from "../repositorio/BodegaRepositorio";
import LoteRepositorio from "../repositorio/LoteRepositorio";
import ProdutoRepositorio from "../repositorio/ProdutoRepositorio";
import UsuarioRepositorio from "../repositorio/UsuarioRepositorio";

export default class LoteServico implements ServicoEscrita<Lote> {
  private static repositorio = new LoteRepositorio();
  private static bodegaRepositorio = new BodegaRepositorio();
  private static usuarioRepositorio = new UsuarioRepositorio();
  private static produtoRepositorio = new ProdutoRepositorio();

  private static validadorLote = new ValidadorEntidade(
    {
      'quantidadeInicial': Validacao.vazio,
      'quantidadeAtual': Validacao.vazio,
      'validade': () => null,
      'compradoEm': () => null,
      'custo': Validacao.precoPositivo,
      'precoVenda': Validacao.precoPositivo,
      'precoVendaPromocao': Validacao.precoPositivo,
      'emPromocao': Validacao.vazio,
    },
    {
      'idCriador': (id) => Validacao.entidadeFoiInformada(Number(id), LoteServico.usuarioRepositorio.porId, true),
      'idProduto': (id) => Validacao.entidadeFoiInformada(Number(id), LoteServico.produtoRepositorio.porId, true),
    }
  );

  private static validadorValidade = new ValidadorEntidade(
    {
      'dataLimite': Validacao.data,
    },
    {
      'idBodega': (id) => Validacao.entidadeFoiInformada(Number(id), LoteServico.bodegaRepositorio.porId, true),
    }
  );

  validarCadastro(lote: Lote): Promise<void> {
    return LoteServico.validadorLote.validar(lote, false);
  }

  validarAtualizacao(lote: Lote): Promise<void> {
    return LoteServico.validadorLote.validar(lote, true);
  }

  todos(): Promise<Lote[]> {
    return LoteServico.repositorio.todos();
  }

  porId(id: number): Promise<Lote | null> {
    return LoteServico.repositorio.porId(id);
  }

  async criar(lote: Lote): Promise<Lote> {
    lote.validade = new Date('2024-10-26T00:00:00.000Z');
    lote.compradoEm = new Date('2024-10-26T00:00:00.000Z');
    lote.emPromocao = false;
    await this.validarCadastro(lote);
    return await LoteServico.repositorio.criar(lote);
  }

  async atualizar(lote: Lote): Promise<Lote> {
    lote.validade = new Date('2024-10-26T00:00:00.000Z');
    lote.compradoEm = new Date('2024-10-26T00:00:00.000Z');
    lote.emPromocao = false;
    await this.validarAtualizacao(lote);
    return await LoteServico.repositorio.atualizar(lote);
  }

  remover(id: number): Promise<Lote | null> {
    return LoteServico.repositorio.remover(id);
  }

  async comBaixaValidade(idBodega: number, dataLimite: Date): Promise<Lote[]> {
    await LoteServico.validadorValidade.validar({ idBodega, dataLimite }, false);
    return LoteServico.repositorio.findComBaixaValidade(idBodega, dataLimite);
  }
}
