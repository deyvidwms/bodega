import { ObjetoGenerico } from "./ValidadorEntidade";
import ValidadorVendaLote from "./ValidadorVendaLote"

export default class ValidadorVendaLoteBodega extends ValidadorVendaLote {
  validarAtributosEspecificos(entidade: ObjetoGenerico, atualizacao: boolean): Promise<void> {
    throw new Error("Method not implemented.");
  }
}