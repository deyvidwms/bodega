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
import ErroNegocio from "../arquitetura/ErroNegocio";

class BodegaServico implements ServicoEscrita<Bodega> {
  private static repositorio = new BodegaRepositorio();
  private static loteRepositorio = new LoteRepositorio();
  private static produtoRepositorio = new ProdutoRepositorio();
  private static vendaRepositorio = new VendaRepositorio();

  private static validadorBodega: ValidadorEntidade = {
    validacoesSincronas: {
      'nome': Validacao.nome,
      'descricao': Validacao.vazio,
      'cnpj': Validacao.cnpj,
      'imagem': Validacao.vazio,
    },
    validacoesAssincronas: {},
  };

  validarCadastro(bodega: Bodega): Promise<ErroNegocio | null> {
    return Validacao.validar(BodegaServico.validadorBodega, bodega, false);
  }

  validarAtualizacao(bodega: Bodega): Promise<ErroNegocio | null> {
    return Validacao.validar(BodegaServico.validadorBodega, bodega, true);
  }

  todos(): Promise<Bodega[]> {
    return BodegaServico.repositorio.todos();
  }

  porId(id: number): Promise<Bodega | null> {
    return BodegaServico.repositorio.porId(id);
  }

  async criar(bodega: Bodega): Promise<Bodega> {
    const retorno = await this.validarCadastro(bodega);
    if (retorno === null) {
      return await BodegaServico.repositorio.criar(bodega);
    }
    throw retorno;
  }

  async atualizar(bodega: Bodega): Promise<Bodega> {
    const retorno = await this.validarAtualizacao(bodega);
    if (retorno === null) {
      return await BodegaServico.repositorio.atualizar(bodega);
    }
    throw retorno;
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
    // vendas.forEach(venda => {
    //   venda.vendaLotes.forEach(vendaLote => {
    //     receita.add(vendaLote.valor);
    //   });
    // });

    return { compras: lotes, vendas: vendas, receita, despesa, lucro: receita.minus(despesa) };
  }
}

export default BodegaServico;
