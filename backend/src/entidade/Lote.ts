import { Decimal } from "@prisma/client/runtime/library";

type Lote = {
  id: number,
  quantidadeInicial: number;
  quantidadeAtual: number;
  validade: Date | null;
  compradoEm: Date;
  custo: Decimal;
  precoVenda: Decimal;
  precoVendaPromocao: Decimal;
  emPromocao: boolean;
  idCriador: number;
  idProduto: number;
}

export default Lote;
