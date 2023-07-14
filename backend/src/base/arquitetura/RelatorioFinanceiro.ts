import { Lote, Produto, Venda, VendaLote } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

export default abstract class RelatorioFinanceiro {
  async calcularRelatorio(idComercio: number, inicio: Date, fim: Date) {
    const compras = await this.calcularCompras(idComercio, inicio, fim);
    const vendas = await this.calcularVendas(idComercio, inicio, fim);
    const receita = this.calcularReceita(vendas);
    const despesa = this.calcularDespesa(vendas, compras);
    const lucro = receita.minus(despesa);

    return { compras, vendas, lucro, despesa, receita }
  }

  abstract calcularCompras(idComercio: number, inicio: Date, fim: Date): Promise<Lote[]>;
  abstract calcularVendas(idComercio: number, inicio: Date, fim: Date): Promise<Venda[]>;
  abstract calcularReceita(vendas: Venda[]): Decimal;
  abstract calcularDespesa(vendas: (Venda & any)[], lotes: Lote[]): Decimal;
}
