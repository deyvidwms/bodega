import { Decimal } from "@prisma/client/runtime";

interface Pessoa {
  id: number;
  cpf: string;
  nome: string;
  celular: string | null;
  saldoDevedor: Decimal;
}

export default Pessoa;
