import { Decimal } from "@prisma/client/runtime/library";
import RelatorioFinanceiro from "../../../arquitetura/RelatorioFinanceiro";
import LoteRepositorio from "../../../repositorio/LoteRepositorio";
import VendaRepositorio from "../../../repositorio/VendaRepositorio";
import Lote from "../../../entidade/Lote";
import Venda from "../../../entidade/Venda";
import Produto from "../../../entidade/Produto";
import VendaLote from "../../../entidade/VendaLote";


export default class RelatorioFinanceiroBodega extends RelatorioFinanceiro {
  private static loteRepositorio = new LoteRepositorio();
  private static vendaRepositorio = new VendaRepositorio();

  async calcularCompras(idComercio: number, inicio: Date, fim: Date): Promise<Lote[]> {
    return RelatorioFinanceiroBodega.loteRepositorio.porPeriodo(idComercio, inicio, fim);
  }

  calcularVendas(idComercio: number, inicio: Date, fim: Date): Promise<Venda[]> {
    return RelatorioFinanceiroBodega.vendaRepositorio.porPeriodo(idComercio, inicio, fim);
  }

  calcularReceita(vendas: (Venda & {
    vendaLotes: (VendaLote & { lote: Lote & { produto: Produto } })[]
  })[]): Decimal {
    let receita = new Decimal(0);
    vendas.forEach(venda => {
      venda.vendaLotes.forEach(vendaLote => {
        receita.add(vendaLote.lote.custo.times(vendaLote.quantidade));
      });
    });
    return receita;
  }

  calcularDespesa(lotes: Lote[]): Decimal {
    let despesa = new Decimal(0);
    lotes.forEach(element => {
      despesa.add(element.custo);
    });

    return despesa;
  }
}
