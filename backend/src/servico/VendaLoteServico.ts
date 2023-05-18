import ServicoEscrita from "../arquitetura/ServicoEscrita";
import ValidadorEntidade from "../arquitetura/ValidadorEntidade";
import Validacao from "../arquitetura/Validacao";
import VendaLote from "../entidade/VendaLote";
import VendaLoteRepositorio from "../repositorio/VendaLoteRepositorio";
import LoteRepositorio from "../repositorio/LoteRepositorio";
import VendaRepositorio from "../repositorio/VendaRepositorio";

export default class VendaLoteServico implements ServicoEscrita<VendaLote> {
  private static repositorio = new VendaLoteRepositorio();
  private static loteRepositorio = new LoteRepositorio();
  private static vendaRepositorio = new VendaRepositorio();

  private static validadorVendaLote = new ValidadorEntidade(
    {
      'quantidade': Validacao.vazio,
    },
    {
      'idLote': (id) => Validacao.entidadeFoiInformada(id, VendaLoteServico.loteRepositorio.porId, true),
      'idVenda': (id) => Validacao.entidadeFoiInformada(id, VendaLoteServico.vendaRepositorio.porId, false),
    }
  );

  validarCadastro(vendaLote: VendaLote): Promise<void> {
    return VendaLoteServico.validadorVendaLote.validar(vendaLote, false);
  }

  validarAtualizacao(vendaLote: VendaLote): Promise<void> {
    return VendaLoteServico.validadorVendaLote.validar(vendaLote, true);
  }

  todos(): Promise<VendaLote[]> {
    return VendaLoteServico.repositorio.todos();
  }

  porId(id: number): Promise<VendaLote | null> {
    return VendaLoteServico.repositorio.porId(id);
  }

  async criar(vendaLote: VendaLote): Promise<VendaLote> {
    await this.validarCadastro(vendaLote);
    return await VendaLoteServico.repositorio.criar(vendaLote);
  }

  async atualizar(vendaLote: VendaLote): Promise<VendaLote> {
    await this.validarAtualizacao(vendaLote);
    return await VendaLoteServico.repositorio.atualizar(vendaLote);
  }

  remover(id: number): Promise<VendaLote> {
    return VendaLoteServico.repositorio.remover(id);
  }
}
