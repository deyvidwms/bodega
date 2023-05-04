import ErroNegocio from "../arquitetura/ErroNegocio";
import ServicoEscrita from "../arquitetura/ServicoEscrita";
import Validacao from "../arquitetura/Validacao";
import ValidadorAtributo from "../arquitetura/ValidadorAtributo";
import Usuario from "../entidade/Usuario";
import PessoaRepositorio from "../repositorio/PessoaRepositorio";
import UsuarioRepositorio from "../repositorio/UsuarioRepositorio";

class UsuarioServico implements ServicoEscrita<Usuario> {
  private static repositorio = new UsuarioRepositorio();
  private static pessoaRepositorio = new PessoaRepositorio();

  private static validadorUsuario: ValidadorAtributo = {
    'email': Validacao.email,
    'senha': (senha) => Validacao.vazio('Senha', senha),
    'idPessoa': (id) => Validacao.entidadeFoiInformada('Pessoa', id, UsuarioServico.pessoaRepositorio.porId, true),
  };

  validar(usuario: Usuario): void {
    Validacao.validar(UsuarioServico.validadorUsuario, usuario);
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

  atualizar(usuario: Usuario): Promise<Usuario> {
    this.validar(usuario);
    return UsuarioServico.repositorio.atualizar(usuario);
  }

  remover(id: number): Promise<Usuario | null> {
    return UsuarioServico.repositorio.remover(id);
  }
}

export default UsuarioServico;
