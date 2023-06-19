import { Decimal } from "@prisma/client/runtime";
import Lote from "../entidade/Lote";
import Venda from "../entidade/Venda";

abstract class RelatorioFinanceiro {
  protected idComercio: number;
  protected inicio: Date;
  protected fim: Date;

  constructor(idComercio: number, inicio: Date, fim: Date) {
    this.idComercio = idComercio;
    this.inicio = inicio;
    this.fim = fim
  }

  async calcularRelatorio() {
    const compras = await this.calcularCompras();
    const vendas = await this.calcularVendas();
    const receita = this.calcularReceita(vendas);
    const despesa = this.calcularDespesa(compras);
    const lucro = receita.minus(despesa);

    return { compras, vendas, lucro, despesa, receita }
  }

  abstract calcularCompras(): Promise<Lote[]>;
  abstract calcularVendas(): Promise<Venda[]>;
  abstract calcularReceita(vendas: Venda[]): Decimal;
  abstract calcularDespesa(lotes: Lote[]): Decimal;
}

export default RelatorioFinanceiro;
