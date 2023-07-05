import ValidadorVendaLoteBodega from "../../instancia/bodega/validacao/ValidadorVendaLoteBodega";
import ServicoEscrita from "../arquitetura/ServicoEscrita";
import VendaLote from "../arquitetura/VendaLote";
import VendaLoteRepositorio from "../repositorio/VendaLoteRepositorio";
import ValidadorVendaLote from "../validacao/ValidadorVendaLote";

export default class VendaLoteServico implements ServicoEscrita<VendaLote> {
  private static repositorio = new VendaLoteRepositorio();
  private static validadorVendaLote: ValidadorVendaLote = new ValidadorVendaLoteBodega();

  validarCadastro(vendaLote: VendaLote): Promise<void> {
    return VendaLoteServico.validadorVendaLote.validar(vendaLote, false);
  }

  validarAtualizacao(vendaLote: VendaLote): Promise<void> {
    return VendaLoteServico.validadorVendaLote.validar(vendaLote, true);
  }

  todos(): Promise<any[]> {
    return VendaLoteServico.repositorio.todos();
  }

  porId(id: number): any {
    return VendaLoteServico.repositorio.porId(id);
  }

  async criar(vendaLote: VendaLote): Promise<any> {
    await this.validarCadastro(vendaLote);
    return await VendaLoteServico.repositorio.criar(vendaLote);
  }

  async atualizar(vendaLote: VendaLote): Promise<any> {
    await this.validarAtualizacao(vendaLote);
    return await VendaLoteServico.repositorio.atualizar(vendaLote);
  }

  remover(id: number): Promise<any> {
    return VendaLoteServico.repositorio.remover(id);
  }
}
