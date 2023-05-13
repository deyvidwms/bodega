import { NextFunction, Request, Response } from "express";
import CustomRequest from "../arquitetura/CustomRequest";
import Usuario from "../entidade/Usuario";
import UsuarioServico from "../servico/UsuarioServico";

class UsuarioControle {
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

  criar(req: CustomRequest<Usuario>, res: Response, next: NextFunction): void {
    UsuarioControle.servico.criar(req.body)
      .then((entidade) => { res.status(201).json(entidade); })
      .catch(next);
  }

  atualizar(req: CustomRequest<Usuario>, res: Response, next: NextFunction): void {
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

export default UsuarioControle;
