import ServicoEscrita from "../arquitetura/ServicoEscrita";
import ValidadorEntidade from "../arquitetura/ValidadorEntidade";
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

  private static validadorProduto = new ValidadorEntidade(
    {
      'titulo': Validacao.vazio,
      'descricao': Validacao.vazio,
      'imagem': Validacao.vazio,

    },
    {
      'idCriador': (id) => Validacao.entidadeFoiInformada(Number(id), ProdutoServico.usuarioRepositorio.porId, false),
      'idBodega': (id) => Validacao.entidadeFoiInformada(Number(id), ProdutoServico.bodegaRepositorio.porId, false),
      'idCategoriaProduto': (id) => Validacao.entidadeFoiInformada(Number(id), ProdutoServico.categoriaProdutoRepositorio.porId, false),
    }
  );

  validarCadastro(produto: Produto): Promise<void> {
    return ProdutoServico.validadorProduto.validar(produto, false);
  }

  validarAtualizacao(produto: Produto): Promise<void> {
    return ProdutoServico.validadorProduto.validar(produto, true);
  }

  todos(): Promise<Produto[]> {
    return ProdutoServico.repositorio.todos();
  }

  porId(id: number): Promise<Produto | null> {
    return ProdutoServico.repositorio.porId(id);
  }

  async criar(produto: Produto): Promise<Produto> {
    await this.validarCadastro(produto);
    return await ProdutoServico.repositorio.criar(produto);
  }

  async atualizar(produto: Produto): Promise<Produto> {
    await this.validarAtualizacao(produto);
    return await ProdutoServico.repositorio.atualizar(produto);
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
