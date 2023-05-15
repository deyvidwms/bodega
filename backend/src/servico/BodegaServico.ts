import { Decimal } from "@prisma/client/runtime/library";
import ServicoEscrita from "../arquitetura/ServicoEscrita";
import Validacao from "../arquitetura/Validacao";
import ValidadorEntidade from "../arquitetura/ValidadorEntidade";
import Bodega from "../entidade/Bodega";
import Lote from "../entidade/Lote";
import Produto from "../entidade/Produto";
import BodegaRepositorio from "../repositorio/BodegaRepositorio";
import LoteRepositorio from "../repositorio/LoteRepositorio"
import ProdutoRepositorio from "../repositorio/ProdutoRepositorio";
import VendaRepositorio from "../repositorio/VendaRepositorio";

export default class BodegaServico implements ServicoEscrita<Bodega> {
  private static repositorio = new BodegaRepositorio();
  private static loteRepositorio = new LoteRepositorio();
  private static produtoRepositorio = new ProdutoRepositorio();
  private static vendaRepositorio = new VendaRepositorio();

  private static validadorBodega = new ValidadorEntidade(
    {
      'nome': Validacao.nome,
      'descricao': Validacao.vazio,
      'cnpj': Validacao.cnpj,
      'imagem': Validacao.vazio,
    },
    {}
  );

  private static validadorRelatorioFinanceiro = new ValidadorEntidade(
    {
      'inicio': Validacao.data,
      'fim': Validacao.data,
    },
    {
      'idBodega': (id) => Validacao.entidadeFoiInformada(id, BodegaServico.repositorio.porId, true),
    }
  );

  validarCadastro(bodega: Bodega): Promise<void> {
    return BodegaServico.validadorBodega.validar(bodega, false);
  }

  validarAtualizacao(bodega: Bodega): Promise<void> {
    return BodegaServico.validadorBodega.validar(bodega, true);
  }

  todos(): Promise<Bodega[]> {
    return BodegaServico.repositorio.todos();
  }

  porId(id: number): Promise<Bodega | null> {
    return BodegaServico.repositorio.porId(id);
  }

  async criar(bodega: Bodega): Promise<Bodega> {
    await this.validarCadastro(bodega);
    return await BodegaServico.repositorio.criar(bodega);
  }

  async atualizar(bodega: Bodega): Promise<Bodega> {
    await this.validarAtualizacao(bodega);
    return await BodegaServico.repositorio.atualizar(bodega);
  }

  remover(id: number): Promise<Bodega | null> {
    return BodegaServico.repositorio.remover(id);
  }

  encarte(id: number): Promise<(Produto & { lotes: Lote[]; })[]> {
    return BodegaServico.produtoRepositorio.encarte(id);
  }

  async relatorioFinanceiro(idBodega: number, inicio: Date, fim: Date) {
    await BodegaServico.validadorRelatorioFinanceiro.validar({ idBodega, inicio, fim }, false);
    const lotes = await BodegaServico.loteRepositorio.porPeriodo(idBodega, inicio, fim);
    const vendas = await BodegaServico.vendaRepositorio.porPeriodo(idBodega, inicio, fim);

    let despesa = new Decimal(0);
    lotes.forEach(element => {
      despesa.add(element.custo);
    });

    let receita = new Decimal(0);
    vendas.forEach(venda => {
      venda.vendaLotes.forEach(vendaLote => {
        receita.add(vendaLote.lote.custo.times(vendaLote.quantidade));
      });
    });

    const lucro = receita.minus(despesa);
    return {
      compras: lotes,
      vendas: vendas,
      receita: receita,
      despesa: despesa,
      lucro: lucro
    };
  }
}
