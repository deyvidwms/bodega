import { Lote } from "@prisma/client";
import ServicoEscrita from "../arquitetura/ServicoEscrita";
import ComercioRepositorio from "../repositorio/ComercioRepositorio";
import LoteRepositorio from "../repositorio/LoteRepositorio";
import ProdutoRepositorio from "../repositorio/ProdutoRepositorio";
import UsuarioRepositorio from "../repositorio/UsuarioRepositorio";
import Validacao from "../validacao/Validacao";
import ValidadorEntidade from "../validacao/ValidadorEntidade";

export default class LoteServico implements ServicoEscrita<Lote> {
  private static repositorio = new LoteRepositorio();
  private static comercioRepositorio = new ComercioRepositorio();
  private static usuarioRepositorio = new UsuarioRepositorio();
  private static produtoRepositorio = new ProdutoRepositorio();

  private static validadorLote = new ValidadorEntidade(
    {
      'quantidadeInicial': Validacao.vazio,
      'quantidadeAtual': Validacao.vazio,
      'validade': () => null,
      'compradoEm': () => null,
      'custo': Validacao.precoPositivo,
      'precoVenda': Validacao.precoPositivo,
      'precoVendaPromocao': Validacao.precoPositivo,
      'emPromocao': Validacao.vazio,
    },
    {
      'idCriador': (id) => Validacao.entidadeFoiInformada(Number(id), LoteServico.usuarioRepositorio.porId, true),
      'idProduto': (id) => Validacao.entidadeFoiInformada(Number(id), LoteServico.produtoRepositorio.porId, true),
    }
  );

  private static validadorValidade = new ValidadorEntidade(
    {
      'dataLimite': Validacao.data,
    },
    {
      'idComercio': (id) => Validacao.entidadeFoiInformada(Number(id), LoteServico.comercioRepositorio.porId, true),
    }
  );

  validarCadastro(lote: Lote): Promise<void> {
    return LoteServico.validadorLote.validar(lote, false);
  }

  validarAtualizacao(lote: Lote): Promise<void> {
    return LoteServico.validadorLote.validar(lote, true);
  }

  todos(): Promise<Lote[]> {
    return LoteServico.repositorio.todos();
  }

  porId(id: number): Promise<Lote | null> {
    return LoteServico.repositorio.porId(id);
  }

  async criar(lote: Lote): Promise<Lote> {
    await this.validarCadastro(lote);
    return await LoteServico.repositorio.criar(lote);
  }

  async atualizar(lote: Lote): Promise<Lote> {
    await this.validarAtualizacao(lote);
    return await LoteServico.repositorio.atualizar(lote);
  }

  remover(id: number): Promise<Lote | null> {
    return LoteServico.repositorio.remover(id);
  }

  async comBaixaValidade(idComercio: number, dataLimite: Date): Promise<Lote[]> {
    await LoteServico.validadorValidade.validar({ idComercio, dataLimite }, false);
    return LoteServico.repositorio.findComBaixaValidade(idComercio, dataLimite);
  }
}
