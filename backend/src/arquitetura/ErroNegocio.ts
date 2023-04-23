class ErroNegocio extends Error {
  private erros: string[];

  constructor() {
    super();
    Object.setPrototypeOf(this, ErroNegocio.prototype);

    this.erros = [];
  }

  public addErro(erro: string): void {
    this.erros.push(erro);
  }

  public getErros(): string[] {
    return this.erros;
  }
}
