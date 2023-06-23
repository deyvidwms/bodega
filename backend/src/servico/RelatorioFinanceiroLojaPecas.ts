import { Decimal } from "@prisma/client/runtime/library";
import RelatorioFinanceiro from "../arquitetura/RelatorioFinanceiro";
import Lote from "../entidade/Lote";
import Venda from "../entidade/Venda";

export default class RelatorioFinanceiroLojaPecas extends RelatorioFinanceiro {
  calcularCompras(idComercio: number, inicio: Date, fim: Date): Promise<Lote[]> {
    throw new Error("Method not implemented.");
  }

  calcularVendas(idComercio: number, inicio: Date, fim: Date): Promise<Venda[]> {
    throw new Error("Method not implemented.");
  }

  calcularReceita(vendas: Venda[]): Decimal {
    throw new Error("Method not implemented.");
  }

  calcularDespesa(lotes: Lote[]): Decimal {
    throw new Error("Method not implemented.");
  }
}
