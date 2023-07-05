import { Pessoa, PrismaClient } from "@prisma/client";

export default class PessoaRepositorio {
  private static repositorio = new PrismaClient().pessoa;

  todos() {
    return PessoaRepositorio.repositorio.findMany({ include: { usuario: true } });
  }

  porId(id: number) {
    return PessoaRepositorio.repositorio.findUnique({ where: { id } });
  }

  criar(pessoa: Pessoa) {
    return PessoaRepositorio.repositorio.create({ data: pessoa })
  }

  atualizar(pessoa: Pessoa) {
    return PessoaRepositorio.repositorio.update({
      where: { id: pessoa.id },
      data: pessoa
    });
  }

  remover(id: number) {
    return PessoaRepositorio.repositorio.delete({ where: { id } });
  }

  porCpf(cpf: string) {
    return PessoaRepositorio.repositorio.findUnique({ where: { cpf } });
  }

  porCelular(celular: string) {
    return PessoaRepositorio.repositorio.findUnique({ where: { celular } });
  }
}
