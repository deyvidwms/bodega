import { NextFunction, Request, Response } from "express";
import ComercioServico from "../servico/ComercioServico";

export default class ComercioControle {
  private static servico = new ComercioServico();

  todos(_: Request, res: Response): void {
    ComercioControle.servico.todos()
      .then((entidades) => { res.status(201).json(entidades); });
  }

  porId(req: Request, res: Response, next: NextFunction): void {
    ComercioControle.servico.porId(Number(req.params.id))
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
    ComercioControle.servico.criar(req.body)
      .then((entidade) => { res.status(201).json(entidade); })
      .catch(next);
  }

  atualizar(req: Request, res: Response, next: NextFunction): void {
    ComercioControle.servico.atualizar(req.body)
      .then((entidade) => { res.status(201).json(entidade); })
      .catch(next);
  }

  remover(req: Request, res: Response, next: NextFunction): void {
    ComercioControle.servico.remover(Number(req.params.id))
      .then((entidade) => { res.status(200).json(entidade); })
      .catch(next);
  }

  encarte(req: Request, res: Response, next: NextFunction): void {
    ComercioControle.servico.encarte(Number(req.params.id))
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
    ComercioControle.servico.relatorioFinanceiro(Number(req.params.id), new Date(req.body.inicio), new Date(req.body.fim))
      .then((relatorioFinanceiro) => { res.status(200).json(relatorioFinanceiro) })
      .catch(next);
  }
}
