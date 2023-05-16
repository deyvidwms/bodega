import { PrismaClient } from "@prisma/client";
import Usuario from "../entidade/Usuario";

export default class UsuarioRepositorio {
  private static repositorio = new PrismaClient().usuario;

  todos() {
    return UsuarioRepositorio.repositorio.findMany();
  }

  porId(id: number) {
    return UsuarioRepositorio.repositorio.findUnique({ where: { id } });
  }

  criar(usuario: Usuario) {
    return UsuarioRepositorio.repositorio.create({ data: usuario })
  }

  atualizar(usuario: Usuario) {
    return UsuarioRepositorio.repositorio.update({
      where: { id: usuario.id },
      data: usuario
    });
  }

  remover(id: number) {
    return UsuarioRepositorio.repositorio.delete({ where: { id } });
  }

  usuarioCadastrado(email: string, cpf: string, celular: string | null) {
    const usuarios = UsuarioRepositorio.repositorio.findMany({
      where: {
        OR: [{ pessoa: { cpf, celular } }, { email }]
      }
    });

    return usuarios;
  }

  porPessoa(idPessoa: number) {
    return UsuarioRepositorio.repositorio.findUnique({ where: { idPessoa } });
  }

  porEmail(email: string) {
    return UsuarioRepositorio.repositorio.findUnique({ where: { email } });
  }
}
