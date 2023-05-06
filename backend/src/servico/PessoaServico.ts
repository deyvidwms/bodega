import ServicoEscrita from "../arquitetura/ServicoEscrita";
import ValidadorEntidade from "../arquitetura/ValidadorEntidade";
import Validacao from "../arquitetura/Validacao";
import Pessoa from "../entidade/Pessoa";
import PessoaRepositorio from "../repositorio/PessoaRepositorio";

class PessoaServico implements ServicoEscrita<Pessoa> {
  private static repositorio = new PessoaRepositorio();

  private static validadorPessoa: ValidadorEntidade = {
    'cpf': Validacao.cpf,
    'nome': Validacao.nome,
    'celular': Validacao.celular,
    'endereco': (endereco) => Validacao.vazio('Endereço', endereco),
  };

  validar(pessoa: Pessoa): void {
    Validacao.validar(PessoaServico.validadorPessoa, pessoa);
  }

  todos(): Promise<Pessoa[]> {
    return PessoaServico.repositorio.todos();
  }

  porId(id: number): Promise<Pessoa | null> {
    return PessoaServico.repositorio.porId(id);
  }

  criar(pessoa: Pessoa): Promise<Pessoa> {
    this.validar(pessoa);
    return PessoaServico.repositorio.criar(pessoa);
  }

  atualizar(pessoa: Pessoa): Promise<Pessoa> {
    this.validar(pessoa);
    return PessoaServico.repositorio.atualizar(pessoa);
  }

  remover(id: number): Promise<Pessoa> {
    return PessoaServico.repositorio.remover(id);
  }
}

export default PessoaServico;
