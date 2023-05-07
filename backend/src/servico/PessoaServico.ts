import ServicoEscrita from "../arquitetura/ServicoEscrita";
import ValidadorEntidade from "../arquitetura/ValidadorEntidade";
import Validacao from "../arquitetura/Validacao";
import Pessoa from "../entidade/Pessoa";
import PessoaRepositorio from "../repositorio/PessoaRepositorio";
import ErroNegocio from "../arquitetura/ErroNegocio";

class PessoaServico implements ServicoEscrita<Pessoa> {
  private static repositorio = new PessoaRepositorio();

  private static validadorPessoa: ValidadorEntidade = {
    validacoesSincronas: {
      'cpf': Validacao.cpf,
      'nome': Validacao.nome,
      'celular': Validacao.celular,
    },
    validacoesAssincronas: {}
  };

  validar(pessoa: Pessoa): Promise<ErroNegocio | null> {
    return Validacao.validar(PessoaServico.validadorPessoa, pessoa);
  }

  todos(): Promise<Pessoa[]> {
    return PessoaServico.repositorio.todos();
  }

  porId(id: number): Promise<Pessoa | null> {
    return PessoaServico.repositorio.porId(id);
  }

  async criar(pessoa: Pessoa): Promise<Pessoa> {
    const retorno = await this.validar(pessoa);
    if (retorno === null) {
      return await PessoaServico.repositorio.criar(pessoa);
    }
    throw retorno;
  }

  async atualizar(pessoa: Pessoa): Promise<Pessoa> {
    const retorno = await this.validar(pessoa);
    if (retorno === null) {
      return await PessoaServico.repositorio.atualizar(pessoa);
    }
    throw retorno;
  }

  remover(id: number): Promise<Pessoa> {
    return PessoaServico.repositorio.remover(id);
  }
}

export default PessoaServico;
