import { Decimal } from "@prisma/client/runtime/library";

type Lote = {
  id: number,
  quantidadeInicial: number;
  quantidadeAtual: number;
  validade: Date | null;
  compradoEm: Date;
  custo: Decimal;
  precoVenda: Decimal;
  precoVendaPromocao: Decimal | null;
  emPromocao: boolean;
  idProduto: number;
  idCriador: number;
}

export default Lote;
