import ServicoEscrita from "../arquitetura/ServicoEscrita";
import Validacao from "../arquitetura/Validacao";
import ValidadorEntidade from "../arquitetura/ValidadorEntidade";
import Venda from "../entidade/Venda";
import VendaRepositorio from "../repositorio/VendaRepositorio";

class VendaServico implements ServicoEscrita<Venda> {
  private static repositorio = new VendaRepositorio();

  private static validadorVenda: ValidadorEntidade = {
    'vendidoEm': () => null,
  };

  validar(venda: Venda): void {
    Validacao.validar(VendaServico.validadorVenda, venda);
  }

  todos(): Promise<Venda[]> {
    return VendaServico.repositorio.todos();
  }

  porId(id: number): Promise<Venda | null> {
    return VendaServico.repositorio.porId(id);
  }

  async criar(venda: Venda): Promise<Venda> {
    this.validar(venda);
    return await VendaServico.repositorio.criar(venda);
  }

  atualizar(venda: Venda): Promise<Venda> {
    this.validar(venda);
    return VendaServico.repositorio.atualizar(venda);
  }

  remover(id: number): Promise<Venda | null> {
    return VendaServico.repositorio.remover(id);
  }
}

export default VendaServico;
