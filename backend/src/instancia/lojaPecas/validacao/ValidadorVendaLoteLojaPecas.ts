import { ObjetoGenerico } from "../../../validacao/ValidadorEntidade";
import ValidadorVendaLote from "../../../validacao/ValidadorVendaLote"

export default class ValidadorVendaLoteLojaPecas extends ValidadorVendaLote {
  validarAtributosEspecificos(entidade: ObjetoGenerico, atualizacao: boolean): Promise<void> {
    throw new Error("Method not implemented.");
  }
}