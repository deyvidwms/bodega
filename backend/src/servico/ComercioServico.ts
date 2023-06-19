import { Decimal } from "@prisma/client/runtime/library";
import ServicoEscrita from "../arquitetura/ServicoEscrita";
import Validacao from "../arquitetura/Validacao";
import ValidadorEntidade from "../arquitetura/ValidadorEntidade";
import Comercio from "../entidade/Comercio";
import Lote from "../entidade/Lote";
import Produto from "../entidade/Produto";
import ComercioRepositorio from "../repositorio/ComercioRepositorio";
import LoteRepositorio from "../repositorio/LoteRepositorio"
import ProdutoRepositorio from "../repositorio/ProdutoRepositorio";
import VendaRepositorio from "../repositorio/VendaRepositorio";
import RelatorioFinanceiro from "../arquitetura/RelatorioFinanceiro";
import RelatorioFinanceiroComercio from "./RelatorioFinanceiroComercio";

export default class ComercioServico implements ServicoEscrita<Comercio> {
  private static repositorio = new ComercioRepositorio();
  private static loteRepositorio = new LoteRepositorio();
  private static produtoRepositorio = new ProdutoRepositorio();
  private static vendaRepositorio = new VendaRepositorio();

  private static validadorComercio = new ValidadorEntidade(
    {
      'nome': Validacao.nome,
      'descricao': Validacao.vazio,
      'cnpj': Validacao.cnpj,
      'imagem': Validacao.vazio,
    },
    {
      'cnpj': (cnpj) => Validacao.valorUnico(cnpj, ComercioServico.repositorio.porCnpj),
    }
  );

  private static validadorRelatorioFinanceiro = new ValidadorEntidade(
    {
      'inicio': Validacao.data,
      'fim': Validacao.data,
    },
    {
      'idComercio': (id) => Validacao.entidadeFoiInformada(id, ComercioServico.repositorio.porId, true),
    }
  );

  validarCadastro(comercio: Comercio): Promise<void> {
    return ComercioServico.validadorComercio.validar(comercio, false);
  }

  validarAtualizacao(comercio: Comercio): Promise<void> {
    return ComercioServico.validadorComercio.validar(comercio, true);
  }

  todos(): Promise<Comercio[]> {
    return ComercioServico.repositorio.todos();
  }

  porId(id: number): Promise<Comercio | null> {
    return ComercioServico.repositorio.porId(id);
  }

  async criar(comercio: Comercio): Promise<Comercio> {
    await this.validarCadastro(comercio);
    return await ComercioServico.repositorio.criar(comercio);
  }

  async atualizar(comercio: Comercio): Promise<Comercio> {
    await this.validarAtualizacao(comercio);
    return await ComercioServico.repositorio.atualizar(comercio);
  }

  remover(id: number): Promise<Comercio | null> {
    return ComercioServico.repositorio.remover(id);
  }

  encarte(id: number): Promise<(Produto & { lotes: Lote[]; })[]> {
    return ComercioServico.produtoRepositorio.encarte(id);
  }

  async relatorioFinanceiro(idComercio: number, inicio: Date, fim: Date) {
    const relatorioFinanceiroComercio = new RelatorioFinanceiroComercio(idComercio, inicio, fim);
    return relatorioFinanceiroComercio.calcularRelatorio();
  }
}
