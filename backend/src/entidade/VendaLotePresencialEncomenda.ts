import VendaLote from "../arquitetura/VendaLote";

export default interface VendaLotePresencialEncomenda extends VendaLote {
  dataEncomenda: Date;
}
