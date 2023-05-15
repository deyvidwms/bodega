import { NextFunction, Request, Response } from "express";
import ProdutoServico from "../servico/ProdutoServico";

export default class ProdutoControle {
  private static servico = new ProdutoServico();

  todos(_: Request, res: Response): void {
    ProdutoControle.servico.todos()
      .then((entidades) => { res.status(201).json(entidades); });
  }

  porId(req: Request, res: Response, next: NextFunction): void {
    ProdutoControle.servico.porId(Number(req.params.id))
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

    ProdutoControle.servico.criar(req.body)
      .then((entidade) => { res.status(201).json(entidade); })
      .catch(next);
  }

  atualizar(req: Request, res: Response, next: NextFunction): void {
    for (let key in req.body) {
      if (key.startsWith('id')) {
        req.body[key] = Number(req.body[key]);
      }
    }

    ProdutoControle.servico.atualizar(req.body)
      .then((entidade) => { res.status(201).json(entidade); })
      .catch(next);
  }

  remover(req: Request, res: Response, next: NextFunction): void {
    ProdutoControle.servico.remover(Number(req.params.id))
      .then((entidade) => { res.status(200).json(entidade); })
      .catch(next);
  }

  produtosComBaixoEstoque(req: Request, res: Response): void {
    ProdutoControle.servico.produtosComBaixoEstoque(Number(req.params.limite))
      .then((response) => res.status(200).json({ produtos: response }))
      .catch(() => res.status(200).json({ produtos: [] }));
  }
}
