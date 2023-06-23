import { PrismaClient } from "@prisma/client";
import VendaLote from "../entidade/VendaLote";

export default class VendaLoteRepositorio {
  private static repositorio = new PrismaClient().vendaLote;

  todos() {
    return VendaLoteRepositorio.repositorio.findMany({ include: { lote: true } });
  }

  porId(id: number) {
    return VendaLoteRepositorio.repositorio.findUnique({ where: { id }, include: { lote: true } });
  }

  criar(vendaLote: VendaLote) {
    return VendaLoteRepositorio.repositorio.create({ data: vendaLote })
  }

  atualizar(vendaLote: VendaLote) {
    return VendaLoteRepositorio.repositorio.update({
      where: { id: vendaLote.id },
      data: vendaLote
    });
  }

  remover(id: number) {
    return VendaLoteRepositorio.repositorio.delete({ where: { id } });
  }
}
