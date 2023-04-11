import Lote from "../entidade/Lote";
import LoteRepositorio from "../repositorio/loteRepositorio";

class LoteServico {
  private static repositorio = new LoteRepositorio();

  todos(): Promise<Lote[]> {
    return LoteServico.repositorio.todos();
  }

  porId(id: number): Promise<Lote | null> {
    return LoteServico.repositorio.porId(id);
  }

  async criar(lote: Lote): Promise<Lote> {
    // Validar lote

    return await LoteServico.repositorio.criar(lote);
  }

  atualizar(lote: Lote): Promise<Lote | null> {
    // Validar lote

    return LoteServico.repositorio.atualizar(lote);
  }

  remover(id: number): Promise<Lote | null> {
    console.log(id);
    return LoteServico.repositorio.remover(id);
  }
}

export default LoteServico;
