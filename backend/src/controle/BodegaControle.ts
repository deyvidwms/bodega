import { NextFunction, Request, Response } from "express";
import BodegaServico from "../servico/BodegaServico";

export default class BodegaControle {
  private static servico = new BodegaServico();

  todos(_: Request, res: Response): void {
    BodegaControle.servico.todos()
      .then((entidades) => { res.status(201).json(entidades); });
  }

  porId(req: Request, res: Response, next: NextFunction): void {
    BodegaControle.servico.porId(Number(req.params.id))
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

    BodegaControle.servico.criar(req.body)
      .then((entidade) => { res.status(201).json(entidade); })
      .catch(next);
  }

  atualizar(req: Request, res: Response, next: NextFunction): void {
    for (let key in req.body) {
      if (!Number.isNaN(req.body[key])) {
        req.body[key] = Number(req.body[key]);
      }
    }

    BodegaControle.servico.atualizar(req.body)
      .then((entidade) => { res.status(201).json(entidade); })
      .catch(next);
  }

  remover(req: Request, res: Response, next: NextFunction): void {
    BodegaControle.servico.remover(Number(req.params.id))
      .then((entidade) => { res.status(200).json(entidade); })
      .catch(next);
  }

  encarte(req: Request, res: Response, next: NextFunction): void {
    BodegaControle.servico.encarte(Number(req.params.id))
      .then((encarte) => {
        if (encarte == null) {
          res.status(404).send();
        } else {
          res.status(201).json(encarte);
        }
      })
      .catch(next);
  }

  relatorioFinanceiro(req: Request, res: Response, next: NextFunction): void {
    for (let key in req.body) {
      if (!Number.isNaN(req.body[key])) {
        req.body[key] = Number(req.body[key]);
      }
    }

    BodegaControle.servico.relatorioFinanceiro(Number(req.params.id), req.body.inicio, req.body.fim)
      .then((relatorioFinanceiro) => { res.status(200).json(relatorioFinanceiro) })
      .catch(next);
  }
}
