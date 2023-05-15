import { NextFunction, Request, Response } from "express";
import VendaServico from "../servico/VendaServico";

export default class VendaControle {
  private static servico = new VendaServico();

  todos(_: Request, res: Response): void {
    VendaControle.servico.todos()
      .then((entidades) => { res.status(201).json(entidades); });
  }

  porId(req: Request, res: Response, next: NextFunction): void {
    VendaControle.servico.porId(Number(req.params.id))
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
    for (let key in req.body) {
      if (!Number.isNaN(req.body[key])) {
        req.body[key] = Number(req.body[key]);
      }
    }

    VendaControle.servico.criar(req.body)
      .then((entidade) => { res.status(201).json(entidade); })
      .catch(next);
  }

  atualizar(req: Request, res: Response, next: NextFunction): void {
    for (let key in req.body) {
      if (!Number.isNaN(req.body[key])) {
        req.body[key] = Number(req.body[key]);
      }
    }

    VendaControle.servico.atualizar(req.body)
      .then((entidade) => { res.status(201).json(entidade); })
      .catch(next);
  }

  remover(req: Request, res: Response, next: NextFunction): void {
    VendaControle.servico.remover(Number(req.params.id))
      .then((entidade) => { res.status(200).json(entidade); })
      .catch(next);
  }

  relatorioDemandaProdutosMensal(req: Request, res: Response, next: NextFunction): void {
    VendaControle.servico.relatorioDemandaProdutosMensal(Number(req.params.id))
      .then((entidade) => { res.status(200).json(entidade); })
      .catch(next);
  }
}
