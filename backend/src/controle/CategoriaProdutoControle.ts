import { NextFunction, Request, Response } from "express";
import CustomRequest from "../arquitetura/CustomRequest";
import CategoriaProduto from "../entidade/CategoriaProduto";
import CategoriaProdutoServico from "../servico/CategoriaProdutoServico";

class CategoriaProdutoControle {
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

  criar(req: CustomRequest<CategoriaProduto>, res: Response, next: NextFunction): void {
    CategoriaProdutoControle.servico.criar(req.body)
      .then((entidade) => { res.status(201).json(entidade); })
      .catch(next);
  }

  atualizar(req: CustomRequest<CategoriaProduto>, res: Response, next: NextFunction): void {
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

export default CategoriaProdutoControle;