import { Decimal } from "@prisma/client/runtime/library";
import RelatorioFinanceiro from "../../../base/arquitetura/RelatorioFinanceiro";
import { Lote, Produto, Venda } from "@prisma/client";
import LoteRepositorio from "../../../base/repositorio/LoteRepositorio";
import VendaRepositorio from "../../../base/repositorio/VendaRepositorio";
import VendaLoteSupermercado from "../entidade/VendaLoteSupermercado";

export default class RelatorioFinanceiroSupermercado extends RelatorioFinanceiro {
  private static loteRepositorio = new LoteRepositorio();
  private static vendaRepositorio = new VendaRepositorio();

  async calcularCompras(idComercio: number, inicio: Date, fim: Date): Promise<Lote[]> {
    return RelatorioFinanceiroSupermercado.loteRepositorio.porPeriodo(idComercio, inicio, fim);
  }

  async calcularVendas(idComercio: number, inicio: Date, fim: Date): Promise<Venda[]> {
    return RelatorioFinanceiroSupermercado.vendaRepositorio.porPeriodo(idComercio, inicio, fim);
  }

  calcularReceita(vendas: (Venda & {
    vendaLotes: (VendaLoteSupermercado & { lote: Lote & { produto: Produto } })[]
  })[]): Decimal {
    let receita = new Decimal(0);
    vendas.forEach(venda => {
      venda.vendaLotes.forEach(vendaLote => {
        receita.add(vendaLote.lote.custo.times(vendaLote.quantidade));
      });
    });
    return receita;
  }

  calcularDespesa(vendas: (Venda & {
    vendaLotes: (VendaLoteSupermercado & { lote: Lote & { produto: Produto } })[]
  })[], lotes: Lote[]): Decimal {
    const taxaEntrega = 0.10; // 10%

    let despesa = new Decimal(0);

    vendas.forEach((venda) => {
      venda.vendaLotes.forEach((vendaLote) => {
        const valor = vendaLote.lote.precoVenda.times(vendaLote.quantidade);
        despesa.add(valor.times(taxaEntrega));
      });
    })

    lotes.forEach(element => {
      despesa.add(element.custo);
    });
    return despesa;
  }
}
