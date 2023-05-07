import ServicoEscrita from "../arquitetura/ServicoEscrita";
import ValidadorEntidade from "../arquitetura/ValidadorEntidade";
import Validacao from "../arquitetura/Validacao";
import Produto from "../entidade/Produto";
import BodegaRepositorio from "../repositorio/BodegaRepositorio";
import CategoriaProdutoRepositorio from "../repositorio/CategoriaProdutoRepositorio";
import LoteRepositorio from "../repositorio/LoteRepositorio";
import ProdutoRepositorio from "../repositorio/ProdutoRepositorio";
import UsuarioRepositorio from "../repositorio/UsuarioRepositorio";
import ErroNegocio from "../arquitetura/ErroNegocio";

class ProdutoServico implements ServicoEscrita<Produto> {
  private static repositorio = new ProdutoRepositorio();
  private static categoriaProdutoRepositorio = new CategoriaProdutoRepositorio();
  private static bodegaRepositorio = new BodegaRepositorio();
  private static loteRepositorio = new LoteRepositorio();
  private static usuarioRepositorio = new UsuarioRepositorio();

  private static validadorProduto: ValidadorEntidade = {
    validacoesSincronas: {
      'titulo': Validacao.vazio,
      'descricao': Validacao.vazio,
      'imagem': Validacao.vazio,

    },
    validacoesAssincronas: {
      'idCriador': (id) => Validacao.entidadeFoiInformada(id, ProdutoServico.usuarioRepositorio.porId, false),
      'idBodega': (id) => Validacao.entidadeFoiInformada(id, ProdutoServico.bodegaRepositorio.porId, false),
      'idCategoriaProduto': (id) => Validacao.entidadeFoiInformada(id, ProdutoServico.categoriaProdutoRepositorio.porId, false),
    }
  };

  validar(produto: Produto): Promise<ErroNegocio | null> {
    return Validacao.validar(ProdutoServico.validadorProduto, produto);
  }

  todos(): Promise<Produto[]> {
    return ProdutoServico.repositorio.todos();
  }

  porId(id: number): Promise<Produto | null> {
    return ProdutoServico.repositorio.porId(id);
  }

  async criar(produto: Produto): Promise<Produto> {
    const retorno = await this.validar(produto);
    if (retorno === null) {
      return await ProdutoServico.repositorio.criar(produto);
    }
    throw retorno;
  }

  async atualizar(produto: Produto): Promise<Produto> {
    const retorno = await this.validar(produto);
    if (retorno === null) {
      return await ProdutoServico.repositorio.atualizar(produto);
    }
    throw retorno;
  }

  remover(id: number): Promise<Produto | null> {
    return ProdutoServico.repositorio.remover(id);
  }

  async produtosComBaixoEstoque(limite: number): Promise<Produto[]> {
    const ids = await ProdutoServico.loteRepositorio.produtosComBaixoEstoque(limite);
    return ProdutoServico.repositorio.porIds(ids);
  }
}

export default ProdutoServico;
