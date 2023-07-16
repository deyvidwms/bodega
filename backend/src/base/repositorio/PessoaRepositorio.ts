import { Pessoa, PrismaClient } from "@prisma/client";

export default class PessoaRepositorio {
  private static repositorio = new PrismaClient().pessoa;

  async todos() {
    const pessoas = await PessoaRepositorio.repositorio.findMany({ include: { usuario: true } });
    return pessoas.map((p) => ({ ...p, whatsapp: p.celular }));
  }

  async porId(id: number) {
    const p = await PessoaRepositorio.repositorio.findUnique({ where: { id } });
    if (p === null) {
      return null;
    }
    return { ...p, whatsapp: p.celular };
  }

  async criar(pessoa: Pessoa) {
    const p = await PessoaRepositorio.repositorio.create({ data: pessoa });
    if (p === null) {
      return null;
    }
    return { ...p, whatsapp: p.celular };
  }

  async atualizar(pessoa: Pessoa) {
    const p = await PessoaRepositorio.repositorio.update({
      where: { id: pessoa.id },
      data: pessoa
    });
    if (p === null) {
      return null;
    }
    return { ...p, whatsapp: p.celular };
  }

  remover(id: number) {
    return PessoaRepositorio.repositorio.delete({ where: { id } });
  }

  async porCpf(cpf: string) {
    const p = await PessoaRepositorio.repositorio.findUnique({ where: { cpf } });
    if (p === null) {
      return null;
    }
    return { ...p, whatsapp: p.celular };
  }

  async porCelular(celular: string) {
    const p = await PessoaRepositorio.repositorio.findUnique({ where: { celular } });
    if (p === null) {
      return null;
    }
    return { ...p, whatsapp: p.celular };
  }
}
