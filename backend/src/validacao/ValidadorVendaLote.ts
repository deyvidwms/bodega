import LoteRepositorio from "../repositorio/LoteRepositorio";
import VendaRepositorio from "../repositorio/VendaRepositorio";
import Validacao from "./Validacao";
import ValidadorEntidade, { ObjetoGenerico } from "./ValidadorEntidade";

export default abstract class ValidadorVendaLote {
  private static loteRepositorio = new LoteRepositorio();
  private static vendaRepositorio = new VendaRepositorio();

  private static validadorVendaLote = new ValidadorEntidade(
    {
      'quantidade': Validacao.vazio,
    },
    {
      'idLote': (id) => Validacao.entidadeFoiInformada(id, ValidadorVendaLote.loteRepositorio.porId, true),
      'idVenda': (id) => Validacao.entidadeFoiInformada(id, ValidadorVendaLote.vendaRepositorio.porId, false),
    }
  );

  async validar(entidade: ObjetoGenerico, atualizacao: boolean): Promise<void> {
    this.validarAtributosComuns(entidade, atualizacao);
    this.validarAtributosEspecificos(entidade, atualizacao);
  }

  private async validarAtributosComuns(entidade: ObjetoGenerico, atualizacao: boolean): Promise<void> {
    ValidadorVendaLote.validadorVendaLote.validar(entidade, atualizacao)
  }

  abstract validarAtributosEspecificos(entidade: ObjetoGenerico, atualizacao: boolean): Promise<void>;
}
