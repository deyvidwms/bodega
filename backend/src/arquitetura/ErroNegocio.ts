export default class ErroNegocio extends Error {
  private erros: { [atributo: string]: string };

  constructor(erros: { [atributo: string]: string }) {
    super();
    Object.setPrototypeOf(this, ErroNegocio.prototype);

    this.erros = erros;
  }

  public getErros(): { [atributo: string]: string } {
    return this.erros;
  }
}
