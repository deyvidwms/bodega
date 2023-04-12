import Venda from "../entidade/Venda";
import VendaRepositorio from "../repositorio/vendaRepositorio";

class VendaServico {
  private static repositorio = new VendaRepositorio();

  todos(): Promise<Venda[]> {
    return VendaServico.repositorio.todos();
  }

  porId(id: number): Promise<Venda | null> {
    return VendaServico.repositorio.porId(id);
  }

  async criar(venda: Venda): Promise<Venda> {
    // Validar venda

    return await VendaServico.repositorio.criar(venda);
  }

  atualizar(venda: Venda): Promise<Venda | null> {
    // Validar venda

    return VendaServico.repositorio.atualizar(venda);
  }

  remover(id: number): Promise<Venda | null> {
    console.log(id);
    return VendaServico.repositorio.remover(id);
  }
}

export default VendaServico;
