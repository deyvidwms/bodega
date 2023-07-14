import { Decimal } from "@prisma/client/runtime/library";
import RelatorioFinanceiro from "../../../base/arquitetura/RelatorioFinanceiro";
import { Lote, Produto, Venda } from "@prisma/client";
import VendaLoteLojaPecas from "../entidade/VendaLoteLojaPecas";
import LoteRepositorio from "../../../base/repositorio/LoteRepositorio";
import VendaRepositorio from "../../../base/repositorio/VendaRepositorio";

export default class RelatorioFinanceiroLojaPecas extends RelatorioFinanceiro {
  private static loteRepositorio = new LoteRepositorio();
  private static vendaRepositorio = new VendaRepositorio();

  async calcularCompras(idComercio: number, inicio: Date, fim: Date): Promise<Lote[]> {
    return RelatorioFinanceiroLojaPecas.loteRepositorio.porPeriodo(idComercio, inicio, fim);
  }

  private static isDataDepoisHoje(data: Date): boolean {
    return new Date(data.toDateString()) >= new Date(new Date().toDateString());
  }

  async calcularVendas(idComercio: number, inicio: Date, fim: Date): Promise<Venda[]> {
    const vendas = await RelatorioFinanceiroLojaPecas.vendaRepositorio.porPeriodo(idComercio, inicio, fim);
    const vendasValidas = []
    for (const venda of vendas) {
      if (venda.vendaLotes[0].dataEncomenda != null && RelatorioFinanceiroLojaPecas.isDataDepoisHoje(venda.vendaLotes[0].dataEncomenda)) {
        vendasValidas.push(venda);
      }
    }
    return vendasValidas;
  }

  calcularReceita(vendas: (Venda & {
    vendaLotes: (VendaLoteLojaPecas & { lote: Lote & { produto: Produto } })[]
  })[]): Decimal {
    let receita = new Decimal(0);
    vendas.forEach(venda => {
      venda.vendaLotes.forEach(vendaLote => {
        if (RelatorioFinanceiroLojaPecas.isDataDepoisHoje(vendaLote.dataEncomenda)) {
          receita.add(vendaLote.lote.custo.times(vendaLote.quantidade));
        }
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
