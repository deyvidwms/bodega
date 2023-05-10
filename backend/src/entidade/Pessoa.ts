import { Decimal } from "@prisma/client/runtime";

type Pessoa = {
  id: number;
  cpf: string;
  nome: string;
  celular: string | null;
  saldoDevedor: Decimal;
}

export default Pessoa;
