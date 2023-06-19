import { Decimal } from "@prisma/client/runtime/library";

interface Pessoa {
  id: number;
  cpf: string;
  nome: string;
  celular: string | null;
  saldoDevedor: Decimal;
}

export default Pessoa;
