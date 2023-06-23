import ServicoEscrita from "../arquitetura/ServicoEscrita";
import Validacao from "../validacao/Validacao";
import ValidadorEntidade from "../validacao/ValidadorEntidade";
import Venda from "../entidade/Venda";
import PessoaRepositorio from "../repositorio/PessoaRepositorio";
import ProdutoRepositorio from "../repositorio/ProdutoRepositorio";
import VendaRepositorio from "../repositorio/VendaRepositorio";

export default class VendaServico implements ServicoEscrita<Venda> {
  private static repositorio = new VendaRepositorio();
  private static produtoRepositorio = new ProdutoRepositorio();
  private static pessoaRepositorio = new PessoaRepositorio();

  private static validadorVenda = new ValidadorEntidade(
    {
      'vendidoEm': Validacao.data,
    },
    {
      'idComprador': (id) => Validacao.entidadeFoiInformada(id, VendaServico.pessoaRepositorio.porId, false),
    }
  );

  validarCadastro(venda: Venda): Promise<void> {
    return VendaServico.validadorVenda.validar(venda, false);
  }

  validarAtualizacao(venda: Venda): Promise<void> {
    return VendaServico.validadorVenda.validar(venda, true);
  }

  todos(): Promise<Venda[]> {
    return VendaServico.repositorio.todos();
  }

  porId(id: number): Promise<Venda | null> {
    return VendaServico.repositorio.porId(id);
  }

  async criar(venda: Venda): Promise<Venda> {
    await this.validarCadastro(venda);
    return await VendaServico.repositorio.criar(venda);
  }

  async atualizar(venda: Venda): Promise<Venda> {
    await this.validarAtualizacao(venda);
    return await VendaServico.repositorio.atualizar(venda);
  }

  remover(id: number): Promise<Venda | null> {
    return VendaServico.repositorio.remover(id);
  }

  relatorioDemandaProdutosMensal(idComercio: number) {
    const dataAtual = new Date();
    dataAtual.setMonth(dataAtual.getMonth() - 1);

    let produtos: { [key: number]: number } = {};
    VendaServico.repositorio.porPeriodo(idComercio, dataAtual, new Date())
      .then((vendas) => {
        if (vendas.length === 0) {
          return null;
        }
        vendas.map((venda) => {
          venda.vendaLotes.map((vendaLote) => {
            const idProduto = vendaLote.lote.produto.id;
            if (produtos[idProduto] === undefined) {
              produtos[idProduto] = vendaLote.quantidade;
            } else {
              produtos[idProduto] += vendaLote.quantidade;
            }
          })
        })
      });

    let idProdutoMaisVendido = 0;
    for (const key in produtos) {
      if (produtos[idProdutoMaisVendido] === undefined || produtos[key] > produtos[idProdutoMaisVendido]) {
      } else {
        idProdutoMaisVendido = Number(key);
      }
    }

    return VendaServico.produtoRepositorio.porId(idProdutoMaisVendido);
  }
}
