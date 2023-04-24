export default class ValidacaoUtils {
  public static vazio(str: string): boolean {
    return str.length > 0;
  }

  public static cpf(cpf: string): boolean {
    if (cpf === undefined) {
      return false;
    }

    cpf = cpf.replace(/[^\d]+\g/, '');

    if (cpf.length != 11) {
      return false;
    }

    let soma = 0;

    if (cpf === "00000000000") {
      return false;
    }

    for (let i = 1; i <= 9; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    let resto = (soma * 10) % 11;

    if ((resto === 10) || (resto === 11)) {
      resto = 0;
    }

    if (resto !== parseInt(cpf.substring(9, 10))) {
      return false;
    }

    soma = 0;
    for (let i = 1; i <= 10; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    resto = (soma * 10) % 11;

    if ((resto === 10) || (resto === 11)) {
      resto = 0;
    }

    return resto === parseInt(cpf.substring(10, 11));
    /*
    if (resto != parseInt(cpf.substring(10, 11))) {
      return false;
    }

    return true;
    */
  }

  public static cnpj(cnpj: string): boolean {
    if (cnpj === undefined) {
      return false;
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
      return false;
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
    if (resultado !== digitos.charAt(0))
      return false;

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
    return resultado === digitos.charAt(1);

    /*
    if (resultado != digitos.charAt(1))
      return false;

    return true;
    */
  }

  public static celular(celular: string): boolean {
    if (celular === undefined) {
      return false;
    }
    const CELULAR_REGEX = /^\(\d{2}\) 9\d{4}-\d{4}$/;
    return CELULAR_REGEX.test(celular);
  }

  public static nome(nome: string): boolean {
    if (nome === undefined) {
      return false;
    }
    return nome !== '' && !/\d/.test(nome);
  }
}
