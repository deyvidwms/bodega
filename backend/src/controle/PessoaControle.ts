import { NextFunction, Request, Response } from "express";
import CustomRequest from "../arquitetura/CustomRequest";
import Pessoa from "../entidade/Pessoa";
import PessoaServico from "../servico/PessoaServico";

class PessoaControle {
  private static servico = new PessoaServico();

  todos(_: Request, res: Response): void {
    PessoaControle.servico.todos()
      .then((entidades) => { res.status(201).json(entidades); });
  }

  porId(req: Request, res: Response, next: NextFunction): void {
    PessoaControle.servico.porId(Number(req.params.id))
      .then((entidade) => {
        if (entidade == null) {
          res.status(404).send();
        } else {
          res.status(201).json(entidade);
        }
      })
      .catch(next);
  }

  criar(req: CustomRequest<Pessoa>, res: Response, next: NextFunction): void {
    PessoaControle.servico.criar(req.body)
      .then((entidade) => { res.status(201).json(entidade); })
      .catch(next);
  }

  atualizar(req: CustomRequest<Pessoa>, res: Response, next: NextFunction): void {
    PessoaControle.servico.atualizar(req.body)
      .then((entidade) => { res.status(201).json(entidade); })
      .catch(next);
  }

  remover(req: Request, res: Response, next: NextFunction): void {
    PessoaControle.servico.remover(Number(req.params.id))
      .then((entidade) => { res.status(200).json(entidade); })
      .catch(next);
  }
}

export default PessoaControle;
