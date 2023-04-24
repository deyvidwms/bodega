import ErroNegocio from "../arquitetura/ErroNegocio";
import IServico from "../arquitetura/IServico";
import ValidacaoUtils from "../arquitetura/ValidacaoUtils";
import Usuario from "../entidade/Usuario";
import PessoaRepositorio from "../repositorio/PessoaRepositorio";
import UsuarioRepositorio from "../repositorio/UsuarioRepositorio";

class UsuarioServico implements IServico<Usuario> {
  private static repositorio = new UsuarioRepositorio();
  private static pessoaRepositorio = new PessoaRepositorio();

  validar(usuario: Usuario): void {
    let erros: string[] = [];

    if (!ValidacaoUtils.email(usuario.email)) {
      erros.push('E-mail inválido');
    }

    if (usuario.senha === undefined || usuario.senha === '') {
      erros.push('Senha inválida');
    }

    UsuarioServico.pessoaRepositorio.porId(usuario.idPessoa).catch(() => {
      erros.push('Pessoa inexistente');
    });

    if (erros.length > 0) {
      throw new ErroNegocio(erros);
    }
  }

  todos(): Promise<Usuario[]> {
    return UsuarioServico.repositorio.todos();
  }

  porId(id: number): Promise<Usuario | null> {
    return UsuarioServico.repositorio.porId(id);
  }

  async criar(usuario: Usuario): Promise<Usuario> {
    this.validar(usuario);
    return await UsuarioServico.repositorio.criar(usuario);
  }

  atualizar(usuario: Usuario): Promise<Usuario | null> {
    this.validar(usuario);
    return UsuarioServico.repositorio.atualizar(usuario);
  }

  remover(id: number): Promise<Usuario | null> {
    return UsuarioServico.repositorio.remover(id);
  }
}

export default UsuarioServico;
