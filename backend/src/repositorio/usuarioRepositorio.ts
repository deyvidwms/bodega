import { PrismaClient } from "@prisma/client";
import Usuario from "../entidade/Usuario";

class UsuarioRepositorio {
  private static repositorio = new PrismaClient().usuario;

  async todos() {
    return await UsuarioRepositorio.repositorio.findMany();
  }

  async porId(id: number) {
    return UsuarioRepositorio.repositorio.findUnique({ where: { id } });
  }

  async criar(usuario: Usuario) {
    return await UsuarioRepositorio.repositorio.create({ data: usuario })
  }

  async atualizar(usuario: Usuario) {
    return UsuarioRepositorio.repositorio.update({
      where: { id: usuario.id },
      data: usuario
    });
  }

  async remover(id: number) {
    return await UsuarioRepositorio.repositorio.delete({ where: { id } });
  }

  async usuarioCadastrado(email: string, cpf: string, celular: string | null) {
    const usuarios = await UsuarioRepositorio.repositorio.findMany({
      where: { OR: [{ email }, { cpf }, { celular }] }
    });

    return usuarios;
  }
}

export default UsuarioRepositorio;