import VendaLote from "../arquitetura/VendaLote";

export default interface VendaLoteEntrega extends VendaLote {
  endereco: string;
}
