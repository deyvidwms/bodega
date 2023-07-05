import VendaLote from "../../../base/arquitetura/VendaLote";

export default class VendaLoteLojaPecas extends VendaLote {
  public dataEncomenda: Date;

  constructor(id: number, quantidade: number, idVenda: number | null, idLote: number, dataEncomenda: Date) {
    super(id, quantidade, idVenda, idLote);
    this.dataEncomenda = dataEncomenda;
  }
}
