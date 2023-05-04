import ErroNegocio from "../arquitetura/ErroNegocio";
import ServicoEscrita from "../arquitetura/ServicoEscrita";
import ValidadorAtributo from "../arquitetura/ValidadorAtributo";
import Validacao from "../arquitetura/Validacao";
import Produto from "../entidade/Produto";
import BodegaRepositorio from "../repositorio/BodegaRepositorio";
import CategoriaProdutoRepositorio from "../repositorio/CategoriaProdutoRepositorio";
import LoteRepositorio from "../repositorio/LoteRepositorio";
import ProdutoRepositorio from "../repositorio/ProdutoRepositorio";
import UsuarioRepositorio from "../repositorio/UsuarioRepositorio";

class ProdutoServico implements ServicoEscrita<Produto> {
  private static repositorio = new ProdutoRepositorio();
  private static categoriaProdutoRepositorio = new CategoriaProdutoRepositorio();
  private static bodegaRepositorio = new BodegaRepositorio();
  private static loteRepositorio = new LoteRepositorio();
  private static usuarioRepositorio = new UsuarioRepositorio();

  validar(produto: Produto): void {
    const validador: ValidadorAtributo = {
      'titulo': (titulo) => Validacao.vazio('Título', titulo),
      'descricao': (descricao) => Validacao.vazio('Descrição', descricao),
      'imagem': (imagem) => Validacao.vazio('Imagem', imagem),
      'idCriador': (id) => Validacao.entidadeFoiInformada('Criador', id, ProdutoServico.usuarioRepositorio.porId, false),
      'idBodega': (id) => Validacao.entidadeFoiInformada('Bodega', id, ProdutoServico.bodegaRepositorio.porId, false),
      'idCategoriaProduto': (id) => Validacao.entidadeFoiInformada('Categoria do produto', id, ProdutoServico.categoriaProdutoRepositorio.porId, false),
    };

    Validacao.validar(validador, produto);
  }

  todos(): Promise<Produto[]> {
    return ProdutoServico.repositorio.todos();
  }

  porId(id: number): Promise<Produto | null> {
    return ProdutoServico.repositorio.porId(id);
  }

  async criar(produto: Produto): Promise<Produto> {
    this.validar(produto);
    return await ProdutoServico.repositorio.criar(produto);
  }

  atualizar(produto: Produto): Promise<Produto> {
    this.validar(produto);
    return ProdutoServico.repositorio.atualizar(produto);
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
