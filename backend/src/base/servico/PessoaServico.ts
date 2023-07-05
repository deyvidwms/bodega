import { Pessoa } from "@prisma/client";
import ServicoEscrita from "../arquitetura/ServicoEscrita";
import PessoaRepositorio from "../repositorio/PessoaRepositorio";
import Validacao from "../validacao/Validacao";
import ValidadorEntidade from "../validacao/ValidadorEntidade";

export default class PessoaServico implements ServicoEscrita<Pessoa> {
  private static repositorio = new PessoaRepositorio();

  private static validadorPessoa = new ValidadorEntidade(
    {
      'cpf': Validacao.cpf,
      'nome': Validacao.nome,
      'celular': Validacao.celular,
      'saldoDevedor': () => null,
    },
    {
      'cpf': (cpf) => Validacao.valorUnico(cpf, PessoaServico.repositorio.porCpf),
      'celular': (celular) => Validacao.valorUnico(celular, PessoaServico.repositorio.porCelular),
    }
  );

  validarCadastro(pessoa: Pessoa): Promise<void> {
    return PessoaServico.validadorPessoa.validar(pessoa, false);
  }

  validarAtualizacao(pessoa: Pessoa): Promise<void> {
    return PessoaServico.validadorPessoa.validar(pessoa, true);
  }

  todos(): Promise<Pessoa[]> {
    return PessoaServico.repositorio.todos();
  }

  porId(id: number): Promise<Pessoa | null> {
    return PessoaServico.repositorio.porId(id);
  }

  async criar(pessoa: Pessoa): Promise<Pessoa> {
    await this.validarCadastro(pessoa);
    return await PessoaServico.repositorio.criar(pessoa);
  }

  async atualizar(pessoa: Pessoa): Promise<Pessoa> {
    await this.validarAtualizacao(pessoa);
    return await PessoaServico.repositorio.atualizar(pessoa);
  }

  remover(id: number): Promise<Pessoa> {
    return PessoaServico.repositorio.remover(id);
  }
}
