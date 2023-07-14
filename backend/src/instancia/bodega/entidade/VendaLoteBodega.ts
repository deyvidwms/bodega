import VendaLote from "../../../base/arquitetura/VendaLote";

export default class VendaLoteBodega extends VendaLote {
  public fiado: boolean;

  constructor(id: number, quantidade: number, idVenda: number | null, idLote: number, fiado: boolean) {
    super(id, quantidade, idVenda, idLote);
    this.fiado = fiado;
  }
}
