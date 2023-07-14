import Validacao from "../../../base/validacao/Validacao";
import ValidadorEntidade, { ObjetoGenerico } from "../../../base/validacao/ValidadorEntidade";
import ValidadorVendaLote from "../../../base/validacao/ValidadorVendaLote";

export default class ValidadorVendaLoteBodega extends ValidadorVendaLote {
  public async validarAtributosEspecificos(entidade: ObjetoGenerico, atualizacao: boolean): Promise<void> {
    const validador = new ValidadorEntidade({ 'fiado': Validacao.vazio, }, {});
    validador.validar(entidade, atualizacao);
  }
}
