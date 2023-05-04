type ErrosAtributos = { [atributo: string]: string };

export default class ErroNegocio extends Error {
  private erros: ErrosAtributos;

  constructor(erros: ErrosAtributos) {
    super();
    Object.setPrototypeOf(this, ErroNegocio.prototype);

    this.erros = erros;
  }

  public getErros(): ErrosAtributos {
    return this.erros;
  }
}
