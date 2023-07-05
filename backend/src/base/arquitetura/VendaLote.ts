export default abstract class VendaLote {
  public id: number;
  public quantidade: number;
  public idVenda: number | null;
  public idLote: number;

  constructor(id: number, quantidade: number, idVenda: number | null, idLote: number) {
    this.id = id;
    this.quantidade = quantidade;
    this.idVenda = idVenda;
    this.idLote = idLote;
  }
}
