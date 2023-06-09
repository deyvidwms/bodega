import { Decimal } from "@prisma/client/runtime/library";

export default interface Lote {
  id: number;
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
