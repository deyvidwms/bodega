import Lote from "../entidade/Lote";
import LoteRepositorio from "../repositorio/LoteRepositorio";

class LoteServico {
  private static repositorio = new LoteRepositorio();

  todos(): Promise<Lote[]> {
    return LoteServico.repositorio.todos();
  }

  porId(id: number): Promise<Lote | null> {
    return LoteServico.repositorio.porId(id);
  }

  async criar(lote: Lote): Promise<Lote> {
    return await LoteServico.repositorio.criar(lote);
  }

  atualizar(lote: Lote): Promise<Lote | null> {
    return LoteServico.repositorio.atualizar(lote);
  }

  remover(id: number): Promise<Lote | null> {
    return LoteServico.repositorio.remover(id);
  }
}

export default LoteServico;
