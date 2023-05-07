import ErroNegocio from "../arquitetura/ErroNegocio";
import ServicoEscrita from "../arquitetura/ServicoEscrita";
import Validacao from "../arquitetura/Validacao";
import ValidadorEntidade from "../arquitetura/ValidadorEntidade";
import Venda from "../entidade/Venda";
import VendaRepositorio from "../repositorio/VendaRepositorio";

class VendaServico implements ServicoEscrita<Venda> {
  private static repositorio = new VendaRepositorio();

  private static validadorVenda: ValidadorEntidade = {
    validacoesSincronas: {
      'vendidoEm': () => null,
    },
    validacoesAssincronas: {}
  };

  validar(venda: Venda): Promise<ErroNegocio | null> {
    return Validacao.validar(VendaServico.validadorVenda, venda);
  }

  todos(): Promise<Venda[]> {
    return VendaServico.repositorio.todos();
  }

  porId(id: number): Promise<Venda | null> {
    return VendaServico.repositorio.porId(id);
  }

  async criar(venda: Venda): Promise<Venda> {
    const retorno = await this.validar(venda);
    if (retorno === null) {
      return await VendaServico.repositorio.criar(venda);
    }
    throw retorno;
  }

  async atualizar(venda: Venda): Promise<Venda> {
    const retorno = await this.validar(venda);
    if (retorno === null) {
      return await VendaServico.repositorio.atualizar(venda);
    }
    throw retorno;
  }

  remover(id: number): Promise<Venda | null> {
    return VendaServico.repositorio.remover(id);
  }
}

export default VendaServico;
