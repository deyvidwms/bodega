import ErroNegocio from "../arquitetura/ErroNegocio";
import IServico from "../arquitetura/IServico";
import ValidacaoUtils from "../arquitetura/ValidacaoUtils";
import Pessoa from "../entidade/Pessoa";
import PessoaRepositorio from "../repositorio/PessoaRepositorio";

class PessoaServico implements IServico<Pessoa> {
  private static repositorio = new PessoaRepositorio();

  validar(pessoa: Pessoa): void {
    let erros: string[] = [];

    if (!ValidacaoUtils.cpf(pessoa.cpf)) {
      erros.push('CPF inválido');
    }

    if (!ValidacaoUtils.nome(pessoa.nome)) {
      erros.push('Nome inválido');
    }

    if (pessoa.celular !== null) {
      if (!ValidacaoUtils.celular(pessoa.celular)) {
        erros.push('Celular inválido');
      }
    }

    if (erros.length !== 0) {
      throw new ErroNegocio(erros);
    }
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
