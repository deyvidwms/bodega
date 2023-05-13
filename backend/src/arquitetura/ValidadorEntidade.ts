import ErroNegocio from "./ErroNegocio";

type ValidacaoSincrona = { [key: string]: (valor: any) => string | null };
type ValidacaoAssincrona = { [key: string]: (valor: any) => Promise<string | null> };

export type ObjetoGenerico = { [key: string]: any };

export default class ValidadorEntidade {
  validacoesSincronas: ValidacaoSincrona;
  validacoesAssincronas: ValidacaoAssincrona;

  constructor(validacoesSincronas: ValidacaoSincrona, validacoesAssincronas: ValidacaoAssincrona) {
    this.validacoesSincronas = validacoesSincronas;
    this.validacoesAssincronas = validacoesAssincronas;
  }

  public async validar(entidade: ObjetoGenerico, atualizacao: boolean): Promise<void> {
    let erros: ObjetoGenerico = {};

    for (const atributo in this.validacoesSincronas) {
      let erro = this.validacoesSincronas[atributo](entidade[atributo]);
      if (erro !== null) {
        erros[atributo] = erro;
      }
    }

    for (const atributo in this.validacoesAssincronas) {
      const erro = await this.validacoesAssincronas[atributo](entidade[atributo]);
      if (erro !== null) {
        erros[atributo] = erro;
      }
    }

    for (const atributo in entidade) {
      if (atributo === 'id' && atualizacao) {
        continue;
      }

      if (this.validacoesSincronas[atributo] === undefined
        && this.validacoesAssincronas[atributo] === undefined) {
        erros[atributo] = 'Atributo não reconhecido';
      }
    }

    if (Object.keys(erros).length > 0) {
      throw new ErroNegocio(erros);
    }
  }
}
