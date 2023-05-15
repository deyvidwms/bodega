import { NextFunction, Request, Response } from "express";
import CategoriaProdutoServico from "../servico/CategoriaProdutoServico";

export default class CategoriaProdutoControle {
  private static servico = new CategoriaProdutoServico();

  todos(_: Request, res: Response): void {
    CategoriaProdutoControle.servico.todos()
      .then((entidades) => { res.status(201).json(entidades); });
  }

  porId(req: Request, res: Response, next: NextFunction): void {
    CategoriaProdutoControle.servico.porId(Number(req.params.id))
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

    CategoriaProdutoControle.servico.criar(req.body)
      .then((entidade) => { res.status(201).json(entidade); })
      .catch(next);
  }

  atualizar(req: Request, res: Response, next: NextFunction): void {
    for (let key in req.body) {
      if (!Number.isNaN(req.body[key])) {
        req.body[key] = Number(req.body[key]);
      }
    }

    CategoriaProdutoControle.servico.atualizar(req.body)
      .then((entidade) => { res.status(201).json(entidade); })
      .catch(next);
  }

  remover(req: Request, res: Response, next: NextFunction): void {
    CategoriaProdutoControle.servico.remover(Number(req.params.id))
      .then((entidade) => { res.status(200).json(entidade); })
      .catch(next);
  }
}
