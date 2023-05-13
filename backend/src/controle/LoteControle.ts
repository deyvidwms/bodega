import { NextFunction, Request, Response } from "express";
import CustomRequest from "../arquitetura/CustomRequest";
import Lote from "../entidade/Lote";
import LoteServico from "../servico/LoteServico";

class LoteControle {
  private static servico = new LoteServico();

  todos(_: Request, res: Response): void {
    LoteControle.servico.todos()
      .then((entidades) => { res.status(201).json(entidades); });
  }

  porId(req: Request, res: Response, next: NextFunction): void {
    LoteControle.servico.porId(Number(req.params.id))
      .then((entidade) => {
        if (entidade == null) {
          res.status(404).send();
        } else {
          res.status(201).json(entidade);
        }
      })
      .catch(next);
  }

  criar(req: CustomRequest<Lote>, res: Response, next: NextFunction): void {
    LoteControle.servico.criar(req.body)
      .then((entidade) => { res.status(201).json(entidade); })
      .catch(next);
  }

  atualizar(req: CustomRequest<Lote>, res: Response, next: NextFunction): void {
    LoteControle.servico.atualizar(req.body)
      .then((entidade) => { res.status(201).json(entidade); })
      .catch(next);
  }

  remover(req: Request, res: Response, next: NextFunction): void {
    LoteControle.servico.remover(Number(req.params.id))
      .then((entidade) => { res.status(200).json(entidade); })
      .catch(next);
  }
}

export default LoteControle;
