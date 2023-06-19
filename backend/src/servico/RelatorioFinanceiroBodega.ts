import { Decimal } from "@prisma/client/runtime";
import RelatorioFinanceiro from "../arquitetura/RelatorioFinanceiro";
import Lote from "../entidade/Lote";
import Venda from "../entidade/Venda";
import LoteRepositorio from "../repositorio/LoteRepositorio";
import VendaRepositorio from "../repositorio/VendaRepositorio";
import VendaLote from "../entidade/VendaLote";
import Produto from "../entidade/Produto";

class RelatorioFinanceiroComercio extends RelatorioFinanceiro {
  private static loteRepositorio = new LoteRepositorio();
  private static vendaRepositorio = new VendaRepositorio();

  constructor(idComercio: number, inicio: Date, fim: Date) {
    super(idComercio, inicio, fim);
  }

  async calcularCompras(): Promise<Lote[]> {
    return RelatorioFinanceiroComercio.loteRepositorio.porPeriodo(this.idComercio, this.inicio, this.fim);
  }

  calcularVendas(): Promise<Venda[]> {
    return RelatorioFinanceiroComercio.vendaRepositorio.porPeriodo(this.idComercio, this.inicio, this.fim);
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

export default RelatorioFinanceiroComercio;
