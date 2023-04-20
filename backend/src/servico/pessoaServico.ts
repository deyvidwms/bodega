import Pessoa from "../entidade/Pessoa";
import PessoaRepositorio from "../repositorio/pessoaRepositorio";

class PessoaServico {
  private static repositorio = new PessoaRepositorio();

  todos(): Promise<Pessoa[]> {
    return PessoaServico.repositorio.todos();
  }

  porId(id: number): Promise<Pessoa | null> {
    return PessoaServico.repositorio.porId(id);
  }

  async criar(pessoa: Pessoa): Promise<Pessoa> {
    // Validar pessoa

    return await PessoaServico.repositorio.criar(pessoa);
  }

  atualizar(pessoa: Pessoa): Promise<Pessoa | null> {
    // Validar pessoa

    return PessoaServico.repositorio.atualizar(pessoa);
  }

  remover(id: number): Promise<Pessoa | null> {
    console.log(id);
    return PessoaServico.repositorio.remover(id);
  }
}

export default PessoaServico;