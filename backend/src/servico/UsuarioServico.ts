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
      'email': (email) => Validacao.valorUnico(email, UsuarioServico.repositorio.porEmail),
      'idPessoa': async (id) => {
        const res = await Validacao.entidadeFoiInformada(Number(id), UsuarioServico.pessoaRepositorio.porId, true);
        return (res === null) ? Validacao.valorUnico(id, UsuarioServico.repositorio.porId) : res;
      },
    }
  );

  private static validadorLogin = new ValidadorEntidade(
    {
      'email': Validacao.email,
      'senha': Validacao.vazio,
    },
    {
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

  async login(email: string, senha: string) {
    await UsuarioServico.validadorLogin.validar({ email, senha }, false);
    const usuario = await UsuarioServico.repositorio.porEmail(email);
    if (usuario === null || usuario.senha !== senha) {
      return null;
    }
    return usuario.id;
  }
}
