import { Decimal } from "@prisma/client/runtime/library";
import RelatorioFinanceiro from "../../../base/arquitetura/RelatorioFinanceiro";
import LoteRepositorio from "../../../base/repositorio/LoteRepositorio";
import VendaRepositorio from "../../../base/repositorio/VendaRepositorio";
import { Lote, Produto, Venda } from "@prisma/client";
import VendaLoteBodega from "../entidade/VendaLoteBodega";

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
    vendaLotes: (VendaLoteBodega & { lote: Lote & { produto: Produto } })[]
  })[]): Decimal {
    let receita = new Decimal(0);
    vendas.forEach(venda => {
      venda.vendaLotes.forEach(vendaLote => {
        receita.add(vendaLote.lote.custo.times(vendaLote.quantidade));
      });
    });
    return receita;
  }

  calcularDespesa(_: Venda[], lotes: Lote[]): Decimal {
    let despesa = new Decimal(0);
    lotes.forEach(element => {
      despesa.add(element.custo);
    });
    return despesa;
  }
}
