import Usuario from "../entidade/Usuario";
import UsuarioRepositorio from "../repositorio/usuarioRepositorio";

class UsuarioServico {
  private static repositorio = new UsuarioRepositorio();

  todos(): Promise<Usuario[]> {
    return UsuarioServico.repositorio.todos();
  }

  porId(id: number): Promise<Usuario | null> {
    return UsuarioServico.repositorio.porId(id);
  }

  async criar(usuario: Usuario): Promise<Usuario> {
    return await UsuarioServico.repositorio.criar(usuario);
  }

  atualizar(usuario: Usuario): Promise<Usuario | null> {
    return UsuarioServico.repositorio.atualizar(usuario);
  }

  remover(id: number): Promise<Usuario | null> {
    return UsuarioServico.repositorio.remover(id);
  }
}

export default UsuarioServico;
