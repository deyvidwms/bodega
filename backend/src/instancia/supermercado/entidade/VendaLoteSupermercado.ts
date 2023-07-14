import VendaLote from "../../../base/arquitetura/VendaLote";

export default class VendaLoteSupermercado extends VendaLote {
  public endereco: string;

  constructor(id: number, quantidade: number, idVenda: number | null, idLote: number, endereco: string) {
    super(id, quantidade, idVenda, idLote);
    this.endereco = endereco;
  }
}
