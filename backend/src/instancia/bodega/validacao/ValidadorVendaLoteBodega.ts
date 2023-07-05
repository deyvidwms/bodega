import { ObjetoGenerico } from "../../../base/validacao/ValidadorEntidade";
import ValidadorVendaLote from "../../../base/validacao/ValidadorVendaLote";

export default class ValidadorVendaLoteBodega extends ValidadorVendaLote {
  validarAtributosEspecificos(entidade: ObjetoGenerico, atualizacao: boolean): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
