import ServicoEscrita from "../arquitetura/ServicoEscrita";
import Validacao from "../arquitetura/Validacao";
import ValidadorEntidade from "../arquitetura/ValidadorEntidade";
import Usuario from "../entidade/Usuario";
import PessoaRepositorio from "../repositorio/PessoaRepositorio";
import UsuarioRepositorio from "../repositorio/UsuarioRepositorio";

export default class UsuarioServico implements ServicoEscrita<Usuario> {
  private static repositorio = new UsuarioRepositorio();
  private static pessoaRepositorio = new PessoaRepositorio();

  private static validadorUsuario = new ValidadorEntidade(
    {
      'email': Validacao.email,
      'senha': Validacao.vazio,
    },
    {
      'idPessoa': (id) => Validacao.entidadeFoiInformada(Number(id), UsuarioServico.pessoaRepositorio.porId, true),
    }
  );

  validarCadastro(usuario: Usuario): Promise<void> {
    return UsuarioServico.validadorUsuario.validar(usuario, false);
  }

  validarAtualizacao(usuario: Usuario): Promise<void> {
    return UsuarioServico.validadorUsuario.validar(usuario, true);
  }

  todos(): Promise<Usuario[]> {
    return UsuarioServico.repositorio.todos();
  }

  porId(id: number): Promise<Usuario | null> {
    return UsuarioServico.repositorio.porId(id);
  }

  async criar(usuario: Usuario): Promise<Usuario> {
    await this.validarCadastro(usuario);
    return await UsuarioServico.repositorio.criar(usuario);
  }

  async atualizar(usuario: Usuario): Promise<Usuario> {
    await this.validarAtualizacao(usuario);
    return await UsuarioServico.repositorio.atualizar(usuario);
  }

  remover(id: number): Promise<Usuario | null> {
    return UsuarioServico.repositorio.remover(id);
  }
}
