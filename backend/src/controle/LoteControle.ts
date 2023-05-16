import { NextFunction, Request, Response } from "express";
import LoteServico from "../servico/LoteServico";

export default class LoteControle {
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

  criar(req: Request, res: Response, next: NextFunction): void {
    LoteControle.servico.criar(req.body)
      .then((entidade) => { res.status(201).json(entidade); })
      .catch(next);
  }

  atualizar(req: Request, res: Response, next: NextFunction): void {
    LoteControle.servico.atualizar(req.body)
      .then((entidade) => { res.status(201).json(entidade); })
      .catch(next);
  }

  remover(req: Request, res: Response, next: NextFunction): void {
    LoteControle.servico.remover(Number(req.params.id))
      .then((entidade) => { res.status(200).json(entidade); })
      .catch(next);
  }

  comBaixaValidade(req: Request, res: Response, next: NextFunction): void {
    LoteControle.servico.comBaixaValidade(Number(req.params.id), req.body.dataLimite)
      .then((entidade) => { res.status(200).json(entidade); })
      .catch(next);
  }
}
