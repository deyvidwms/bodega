import { PrismaClient } from "@prisma/client";
import Pessoa from "../entidade/Pessoa";

class PessoaRepositorio {
  private static repositorio = new PrismaClient().pessoa;

  async todos() {
    return await PessoaRepositorio.repositorio.findMany({ include: { Usuario: true } });
  }

  async porId(id: number) {
    return PessoaRepositorio.repositorio.findUnique({ where: { id } });
  }

  async criar(pessoa: Pessoa) {
    return await PessoaRepositorio.repositorio.create({ data: pessoa })
  }

  async atualizar(pessoa: Pessoa) {
    return PessoaRepositorio.repositorio.update({
      where: { id: pessoa.id },
      data: pessoa
    });
  }

  async remover(id: number) {
    return await PessoaRepositorio.repositorio.delete({ where: { id } });
  }
}

export default PessoaRepositorio;
