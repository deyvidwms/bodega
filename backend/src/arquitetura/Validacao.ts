import ErroNegocio from "./ErroNegocio";
import ValidadorEntidade from "./ValidadorEntidade";
import { Decimal } from "@prisma/client/runtime/library";

type ObjetoGenerico = { [key: string]: any };

export default class Validacao {
  public static async validar(validador: ValidadorEntidade, entidade: ObjetoGenerico): Promise<ErroNegocio | null> {
    let erros: ObjetoGenerico = {};

    for (const atributo in validador.validacoesSincronas) {
      let erro = validador.validacoesSincronas[atributo](entidade[atributo]);
      if (erro !== null) {
        erros[atributo] = erro;
      }
    }

    for (const atributo in validador.validacoesAssincronas) {
      const erro = await validador.validacoesAssincronas[atributo](entidade[atributo])
      if (erro !== null) {
        erros[atributo] = erro;
      }
    }

    for (const atributo in entidade) {
      if (validador.validacoesSincronas[atributo] === undefined && validador.validacoesAssincronas[atributo] === undefined) {
        erros[atributo] = 'Atributo não reconhecido';
      }
    }

    if (Object.keys(erros).length > 0) {
      return new ErroNegocio(erros);
    }

    return null;
  }

  public static async entidadeFoiInformada(idEntidade: number, funcaoTestaExistencia: (id: number) => Promise<any | null>, obrigatoria: boolean): Promise<string | null> {
    if (idEntidade === null || idEntidade === undefined) {
      if (obrigatoria) {
        return 'Id não informado';
      }

      return null;
    }

    const entidade = await funcaoTestaExistencia(idEntidade);
    if (entidade === null) {
      return 'Entidade não encontrada no sistema';
    }
    return null;
  }

  public static precoPositivo(preco: number | Decimal | null): string | null {
    if (preco === null || preco === undefined) {
      return 'Valor não informado';
    }

    if (typeof preco === 'number') {
      preco = new Decimal(preco);
    }

    if (preco.isNegative()) {
      return 'Valor não pode ser negativo';
    }

    return null;
  }

  public static vazio(str: string): string | null {
    if (str === undefined || str.length === 0) {
      return `Valor não informado`
    }

    return null;
  }

  private static descricaoCampoInvalido(nomeCampo: string): string {
    return `${nomeCampo} inválido`;
  }

  public static cpf(cpf: string): string | null {
    const NAO_INFORMADO = 'CPF não informado';
    if (cpf === undefined || cpf.length === 0) {
      return NAO_INFORMADO;
    }

    cpf = cpf.replace(/[^\d]+\g/, '');

    if (cpf.length != 11) {
      return Validacao.descricaoCampoInvalido('CPF');
    }

    let soma = 0;

    if (cpf === "00000000000") {
      return Validacao.descricaoCampoInvalido('CPF');
    }

    for (let i = 1; i <= 9; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    let resto = (soma * 10) % 11;

    if ((resto === 10) || (resto === 11)) {
      resto = 0;
    }

    if (resto !== parseInt(cpf.substring(9, 10))) {
      return Validacao.descricaoCampoInvalido('CPF');
    }

    soma = 0;
    for (let i = 1; i <= 10; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    resto = (soma * 10) % 11;

    if ((resto === 10) || (resto === 11)) {
      resto = 0;
    }

    if (resto != parseInt(cpf.substring(10, 11))) {
      return Validacao.descricaoCampoInvalido('CPF');
    }

    return null;
  }

  public static cnpj(cnpj: string | undefined): string | null {
    const NAO_INFORMADO = 'CNPJ não informado';
    if (cnpj === undefined || cnpj.length === 0) {
      return NAO_INFORMADO;
    }

    if (cnpj == "00000000000000"
      || cnpj == "11111111111111"
      || cnpj == "22222222222222"
      || cnpj == "33333333333333"
      || cnpj == "44444444444444"
      || cnpj == "55555555555555"
      || cnpj == "66666666666666"
      || cnpj == "77777777777777"
      || cnpj == "88888888888888"
      || cnpj == "99999999999999") {
      return Validacao.descricaoCampoInvalido('CNPJ');
    }

    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += Number(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }

    let resultado = String(soma % 11 < 2 ? 0 : 11 - soma % 11);
    if (resultado !== digitos.charAt(0)) {
      return Validacao.descricaoCampoInvalido('CNPJ');
    }

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += Number(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2)
        pos = 9;
    }
    resultado = String(soma % 11 < 2 ? 0 : 11 - soma % 11);

    if (resultado != digitos.charAt(1)) {
      return Validacao.descricaoCampoInvalido('CNPJ');
    }

    return null;
  }

  public static celular(celular: string): string | null {
    const NAO_INFORMADO = 'Celular não informado';
    if (celular === undefined || celular.length === 0) {
      return NAO_INFORMADO;
    }

    const CELULAR_REGEX = /^\(\d{2}\) 9\d{4}-\d{4}$/;
    if (!CELULAR_REGEX.test(celular)) {
      return Validacao.descricaoCampoInvalido('Celular');
    }

    return null;
  }

  public static nome(nome: string): string | null {
    const NAO_INFORMADO = 'Nome não informado';

    if (nome === undefined || nome.length === 0) {
      return NAO_INFORMADO;
    }

    if (/\d/.test(nome)) {
      return Validacao.descricaoCampoInvalido('Nome');
    }

    return null;
  }

  public static email(email: string): string | null {
    const NAO_INFORMADO = 'E-mail não informado';

    if (email === undefined || email.length === 0) {
      return NAO_INFORMADO;
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      return Validacao.descricaoCampoInvalido('E-mail');
    }

    return null;
  }
}
