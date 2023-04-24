import ErroNegocio from "../arquitetura/ErroNegocio";
import IServico from "../arquitetura/IServico";
import Produto from "../entidade/Produto";
import BodegaRepositorio from "../repositorio/BodegaRepositorio";
import CategoriaProdutoRepositorio from "../repositorio/CategoriaProdutoRepositorio";
import LoteRepositorio from "../repositorio/LoteRepositorio";
import ProdutoRepositorio from "../repositorio/ProdutoRepositorio";
import UsuarioRepositorio from "../repositorio/UsuarioRepositorio";

class ProdutoServico implements IServico<Produto> {
  private static repositorio = new ProdutoRepositorio();
  private static categoriaProdutoRepositorio = new CategoriaProdutoRepositorio();
  private static bodegaRepositorio = new BodegaRepositorio();
  private static loteRepositorio = new LoteRepositorio();
  private static usuarioRepositorio = new UsuarioRepositorio();

  validar(produto: Produto): void {
    let erros: string[] = [];

    if (produto.titulo === undefined || produto.titulo === '') {
      erros.push('Título inválido');
    }

    if (produto.descricao === undefined || produto.descricao === '') {
      erros.push('Descrição inválida');
    }

    if (produto.imagem === undefined || produto.imagem === '') {
      erros.push('Descrição inválida');
    }

    if (produto.idCriador !== null) {
      ProdutoServico.usuarioRepositorio.porId(produto.idCriador).catch(() => {
        erros.push('Criador inexistente');
      });
    }

    if (produto.idBodega !== null) {
      ProdutoServico.bodegaRepositorio.porId(produto.idBodega).catch(() => {
        erros.push('Bodega inexistente');
      });
    }

    if (produto.idCategoriaProduto !== null) {
      ProdutoServico.categoriaProdutoRepositorio.porId(produto.idCategoriaProduto).catch(() => {
        erros.push('Bodega inexistente');
      });
    }

    if (erros.length > 0) {
      throw new ErroNegocio(erros);
    }
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

  atualizar(produto: Produto): Promise<Produto | null> {
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
