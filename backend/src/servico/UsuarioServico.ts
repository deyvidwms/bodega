import ErroNegocio from "../arquitetura/ErroNegocio";
import ServicoEscrita from "../arquitetura/ServicoEscrita";
import Validacao from "../arquitetura/Validacao";
import ValidadorEntidade from "../arquitetura/ValidadorEntidade";
import Usuario from "../entidade/Usuario";
import PessoaRepositorio from "../repositorio/PessoaRepositorio";
import UsuarioRepositorio from "../repositorio/UsuarioRepositorio";

class UsuarioServico implements ServicoEscrita<Usuario> {
  private static repositorio = new UsuarioRepositorio();
  private static pessoaRepositorio = new PessoaRepositorio();

  private static validadorUsuario: ValidadorEntidade = {
    validacoesSincronas: {
      'email': Validacao.email,
      'senha': Validacao.vazio,
    },
    validacoesAssincronas: {
      'idPessoa': (id) => Validacao.entidadeFoiInformada(Number(id), UsuarioServico.pessoaRepositorio.porId, true),
    }
  };

  validar(usuario: Usuario): Promise<ErroNegocio | null> {
    return Validacao.validar(UsuarioServico.validadorUsuario, usuario);
  }

  todos(): Promise<Usuario[]> {
    return UsuarioServico.repositorio.todos();
  }

  porId(id: number): Promise<Usuario | null> {
    return UsuarioServico.repositorio.porId(id);
  }

  async criar(usuario: Usuario): Promise<Usuario> {
    const retorno = await this.validar(usuario);
    if (retorno === null) {
      return await UsuarioServico.repositorio.criar(usuario);
    }
    throw retorno;
  }

  async atualizar(usuario: Usuario): Promise<Usuario> {
    const retorno = await this.validar(usuario);
    if (retorno === null) {
      return await UsuarioServico.repositorio.atualizar(usuario);
    }
    throw retorno;
  }

  remover(id: number): Promise<Usuario | null> {
    return UsuarioServico.repositorio.remover(id);
  }
}

export default UsuarioServico;
