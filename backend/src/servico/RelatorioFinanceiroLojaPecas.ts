import { Decimal } from "@prisma/client/runtime/library";
import RelatorioFinanceiro from "../arquitetura/RelatorioFinanceiro";
import Lote from "../entidade/Lote";
import Venda from "../entidade/Venda";

class RelatorioFinanceiroLojaPecas extends RelatorioFinanceiro {
  constructor(idComercio: number, inicio: Date, fim: Date) {
    super(idComercio, inicio, fim);
  }

  calcularCompras(): Promise<Lote[]> {
    throw new Error("Method not implemented.");
  }

  calcularVendas(): Promise<Venda[]> {
    throw new Error("Method not implemented.");
  }

  calcularReceita(vendas: Venda[]): Decimal {
    throw new Error("Method not implemented.");
  }

  calcularDespesa(lotes: Lote[]): Decimal {
    throw new Error("Method not implemented.");
  }
}

export default RelatorioFinanceiroLojaPecas;
