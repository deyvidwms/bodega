import { Decimal } from "@prisma/client/runtime/library";
import Bodega from "../entidade/Bodega";
import BodegaRepositorio from "../repositorio/BodegaRepositorio";
import LoteRepositorio from "../repositorio/LoteRepositorio";
import VendaRepositorio from "../repositorio/VendaRepositorio";
import ErroNegocio from "../arquitetura/ErroNegocio";
import IServico from "../arquitetura/IServico";
import ValidacaoUtils from "../arquitetura/ValidacaoUtils";
import Lote from "../entidade/Lote";
import Venda from "../entidade/Venda";

class BodegaServico implements IServico<Bodega> {
  private static repositorio = new BodegaRepositorio();
  private static loteRepositorio = new LoteRepositorio();
  private static vendaRepositorio = new VendaRepositorio();

  validar(bodega: Bodega): void {
    let erros: string[] = [];

    if (!ValidacaoUtils.cnpj(bodega.cnpj)) {
      erros.push('CNPJ inválido')
    }

    if (bodega.nome !== undefined && bodega.nome !== "") {
      erros.push('Nome inválido')
    }

    if (bodega.endereco !== undefined && bodega.endereco !== "") {
      erros.push('Endereço inválido')
    }

    if (bodega.imagem !== undefined && bodega.imagem !== "") {
      erros.push('Imagem inválida')
    }

    if (erros.length !== 0) {
      throw new ErroNegocio(erros);
    }
  }

  todos(): Promise<Bodega[]> {
    return BodegaServico.repositorio.todos();
  }

  porId(id: number): Promise<Bodega | null> {
    return BodegaServico.repositorio.porId(id);
  }

  async criar(bodega: Bodega): Promise<Bodega> {
    return await BodegaServico.repositorio.criar(bodega);
  }

  atualizar(bodega: Bodega): Promise<Bodega | null> {
    return BodegaServico.repositorio.atualizar(bodega);
  }

  remover(id: number): Promise<Bodega | null> {
    return BodegaServico.repositorio.remover(id);
  }

  async relatorioFinanceiro(inicio: Date, fim: Date) {
    const lotes = await BodegaServico.loteRepositorio.porPeriodo(inicio, fim);
    const vendas = await BodegaServico.vendaRepositorio.porPeriodo(inicio, fim);

    let despesa = new Decimal(0);
    lotes.forEach(element => {
      despesa.add(element.custo);
    });

    let receita = new Decimal(0);
    vendas.forEach(venda => {
      venda.vendaLotes.forEach(vendaLote => {
        receita.add(vendaLote.valor);
      });
    });

    return { compras: lotes, vendas: vendas, receita, despesa, lucro: receita.minus(despesa) };
  }
}

export default BodegaServico;
