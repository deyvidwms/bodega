import { NextFunction, Request, Response } from "express";
import UsuarioServico from "../servico/UsuarioServico";

export default class UsuarioControle {
  private static servico = new UsuarioServico();

  todos(_: Request, res: Response): void {
    UsuarioControle.servico.todos()
      .then((entidades) => { res.status(201).json(entidades); });
  }

  porId(req: Request, res: Response, next: NextFunction): void {
    UsuarioControle.servico.porId(Number(req.params.id))
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
      if (key.startsWith('id')) {
        req.body[key] = Number(req.body[key]);
      }
    }

    UsuarioControle.servico.criar(req.body)
      .then((entidade) => { res.status(201).json(entidade); })
      .catch(next);
  }

  atualizar(req: Request, res: Response, next: NextFunction): void {
    for (let key in req.body) {
      if (key.startsWith('id')) {
        req.body[key] = Number(req.body[key]);
      }
    }

    UsuarioControle.servico.atualizar(req.body)
      .then((entidade) => { res.status(201).json(entidade); })
      .catch(next);
  }

  remover(req: Request, res: Response, next: NextFunction): void {
    UsuarioControle.servico.remover(Number(req.params.id))
      .then((entidade) => { res.status(200).json(entidade); })
      .catch(next);
  }
}
