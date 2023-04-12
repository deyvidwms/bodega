import { Decimal } from "@prisma/client/runtime";

type Lote = {
  id: number,
  quantidadeInicial: number;
  quantidadeAtual: number;
  expiraEm: Date | null;
  compradoEm: Date;
  custo: Decimal;
  idProduto: number;
  idCriador: number;
}

export default Lote;