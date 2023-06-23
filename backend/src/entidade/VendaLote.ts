import TipoEntrega from "./TipoEntrega";

export default interface VendaLote {
  id: number;
  quantidade: number;
  idVenda: number | null;
  idLote: number;
  tipoEntrega: TipoEntrega;
  endereco: string | null;
  dataEncomenda: Date | null;
}
