type ValidacaoSincrona = { [key: string]: (valor: any) => string | null };
type ValidacaoAssincrona = { [key: string]: (valor: any) => Promise<string | null> };

export default interface ValidadorEntidade {
  validacoesSincronas: ValidacaoSincrona;
  validacoesAssincronas: ValidacaoAssincrona;
}
