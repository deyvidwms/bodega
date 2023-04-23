import { Decimal } from "@prisma/client/runtime/library";

type VendaLote = {
  id: number;
  quantidade: number;
  valor: Decimal;
  idVenda: number | null;
  idLote: number;
}

export default VendaLote;
