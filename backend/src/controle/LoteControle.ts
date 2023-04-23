import { Request, Response } from "express";
import CustomRequest from "../arquitetura/CustomRequest";
import Lote from "../entidade/Lote";
import LoteServico from "../servico/LoteServico";

class LoteControle {
  private static servico = new LoteServico();

  todos(_: CustomRequest<Lote>, res: Response): void {
    LoteControle.servico.todos()
      .then((response) => res.status(200).json({ lotes: response }))
      .catch(() => res.status(200).json({ lotes: [] }));
  }

  porId(req: Request, res: Response): void {
    LoteControle.servico.porId(Number(req.params.id))
      .then((lote) => {
        if (lote == null) {
          res.status(404).send();
          return;
        }

        res.status(201).json({ lote })
      });
  }

  criar(req: CustomRequest<Lote>, res: Response): void {
    LoteControle.servico.criar(req.body)
      .then((lote) => { res.status(201).json({ lote }) });
  }

  atualizar(req: CustomRequest<Lote>, res: Response): void {
    LoteControle.servico.atualizar(req.body)
      .then((lote) => { res.status(201).json({ lote }) });
  }

  remover(req: Request, res: Response): void {
    LoteControle.servico.remover(Number(req.params.id))
      .then((lote) => { res.status(200).json({ lote }) });
  }
}

export default LoteControle;