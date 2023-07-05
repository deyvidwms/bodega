import VendaLote from "../../../base/arquitetura/VendaLote";

export default class VendaLoteSupermercado extends VendaLote {
  public endereco: string | null;

  constructor(id: number, quantidade: number, idVenda: number | null, idLote: number, endereco: string | null) {
    super(id, quantidade, idVenda, idLote);
    this.endereco = endereco;
  }
}
