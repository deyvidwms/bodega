import { Decimal } from "@prisma/client/runtime/library";

export default interface Pessoa {
  id: number;
  cpf: string;
  nome: string;
  celular: string | null;
  saldoDevedor: Decimal;
}
