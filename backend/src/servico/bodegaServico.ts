import Bodega from "../entidade/Bodega";
import BodegaRepositorio from "../repositorio/bodegaRepositorio";

class BodegaServico {
  private static repositorio = new BodegaRepositorio();

  todos(): Promise<Bodega[]> {
    return BodegaServico.repositorio.todos();
  }

  porId(id: number): Promise<Bodega | null> {
    return BodegaServico.repositorio.porId(id);
  }

  async criar(bodega: Bodega): Promise<Bodega> {
    // Validar bodega

    return await BodegaServico.repositorio.criar(bodega);
  }

  atualizar(bodega: Bodega): Promise<Bodega | null> {
    // Validar bodega

    return BodegaServico.repositorio.atualizar(bodega);
  }

  remover(id: number): Promise<Bodega | null> {
    console.log(id);
    return BodegaServico.repositorio.remover(id);
  }
}

export default BodegaServico;