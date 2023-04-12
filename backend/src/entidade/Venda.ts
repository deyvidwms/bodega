import { Decimal } from "@prisma/client/runtime";

type Venda = {
  id: number;
  quantidade: number;
  vendidoEm: Date;
  valorTotal: Decimal;
  idLote: number;
}

export default Venda;
