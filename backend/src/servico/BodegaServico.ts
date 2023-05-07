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

class BodegaServico implements ServicoEscrita<Bodega> {
  private static repositorio = new BodegaRepositorio();
  private static loteRepositorio = new LoteRepositorio();
  private static produtoRepositorio = new ProdutoRepositorio();
  private static vendaRepositorio = new VendaRepositorio();

  private static validadorBodega: ValidadorEntidade = {
    'nome': Validacao.nome,
    'descricao': (descricao) => Validacao.vazio('Descrição', descricao),
    'cnpj': Validacao.cnpj,
    'endereco': (endereco) => Validacao.vazio('Endereço', endereco),
    'imagem': (imagem) => Validacao.vazio('Imagem', imagem),
  };

  validar(bodega: Bodega): void {
    Validacao.validar(BodegaServico.validadorBodega, bodega);
  }

  todos(): Promise<Bodega[]> {
    return BodegaServico.repositorio.todos();
  }

  porId(id: number): Promise<Bodega | null> {
    return BodegaServico.repositorio.porId(id);
  }

  criar(bodega: Bodega): Promise<Bodega> {
    this.validar(bodega);
    return BodegaServico.repositorio.criar(bodega);
  }

  atualizar(bodega: Bodega): Promise<Bodega> {
    this.validar(bodega);
    return BodegaServico.repositorio.atualizar(bodega);
  }

  remover(id: number): Promise<Bodega | null> {
    return BodegaServico.repositorio.remover(id);
  }

  encarte(id: number): Promise<(Produto & { lotes: Lote[]; })[]> {
    return BodegaServico.produtoRepositorio.encarte(id);
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
