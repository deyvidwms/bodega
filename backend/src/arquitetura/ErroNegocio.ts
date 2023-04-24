export default class ErroNegocio extends Error {
  private erros: string[];

  constructor(erros: string[]) {
    super();
    Object.setPrototypeOf(this, ErroNegocio.prototype);

    this.erros = erros;
  }

  public addErro(erro: string): void {
    this.erros.push(erro);
  }

  public getErros(): string[] {
    return this.erros;
  }
}
