import { Decimal } from "@prisma/client/runtime";
import Bodega from "../entidade/Bodega";
import BodegaRepositorio from "../repositorio/bodegaRepositorio";
import LoteRepositorio from "../repositorio/loteRepositorio";
import VendaRepositorio from "../repositorio/vendaRepositorio";

class BodegaServico {
  private static repositorio = new BodegaRepositorio();
  private static loteRepositorio = new LoteRepositorio();
  private static vendaRepositorio = new VendaRepositorio();

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

  async relatorioFinanceiro(inicio: Date, fim: Date){
    //json no estilo [{lotes}, {produtos}, receita, despesa]
    let lotes = await BodegaServico.loteRepositorio.porPeriodo(inicio, fim);
    let vendas = await BodegaServico.vendaRepositorio.porPeriodo(inicio, fim);
    let receita = new Decimal(0);
    let despesa = new Decimal(0);
    lotes.forEach(element => {
      despesa.add(element.custo);
    });

    vendas.forEach(element => {
      receita.add(element.valorTotal);
    });

  
    return {compras: lotes, vendas: vendas, receita, despesa, lucro: receita.minus(despesa)};
  }
}

export default BodegaServico;