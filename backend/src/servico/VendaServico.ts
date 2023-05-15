import ServicoEscrita from "../arquitetura/ServicoEscrita";
import Validacao from "../arquitetura/Validacao";
import ValidadorEntidade from "../arquitetura/ValidadorEntidade";
import Venda from "../entidade/Venda";
import VendaRepositorio from "../repositorio/VendaRepositorio";

export default class VendaServico implements ServicoEscrita<Venda> {
  private static repositorio = new VendaRepositorio();

  private static validadorVenda = new ValidadorEntidade(
    {
      'vendidoEm': Validacao.data,
    },
    {}
  );

  validarCadastro(venda: Venda): Promise<void> {
    return VendaServico.validadorVenda.validar(venda, false);
  }

  validarAtualizacao(venda: Venda): Promise<void> {
    return VendaServico.validadorVenda.validar(venda, true);
  }

  todos(): Promise<Venda[]> {
    return VendaServico.repositorio.todos();
  }

  porId(id: number): Promise<Venda | null> {
    return VendaServico.repositorio.porId(id);
  }

  async criar(venda: Venda): Promise<Venda> {
    await this.validarCadastro(venda);
    return await VendaServico.repositorio.criar(venda);
  }

  async atualizar(venda: Venda): Promise<Venda> {
    await this.validarAtualizacao(venda);
    return await VendaServico.repositorio.atualizar(venda);
  }

  remover(id: number): Promise<Venda | null> {
    return VendaServico.repositorio.remover(id);
  }
}
