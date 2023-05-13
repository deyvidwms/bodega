import { NextFunction, Request, Response } from "express";
import CustomRequest from "../arquitetura/CustomRequest";
import Venda from "../entidade/Venda";
import VendaServico from "../servico/VendaServico";

class VendaControle {
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

  criar(req: CustomRequest<Venda>, res: Response, next: NextFunction): void {
    VendaControle.servico.criar(req.body)
      .then((entidade) => { res.status(201).json(entidade); })
      .catch(next);
  }

  atualizar(req: CustomRequest<Venda>, res: Response, next: NextFunction): void {
    VendaControle.servico.atualizar(req.body)
      .then((entidade) => { res.status(201).json(entidade); })
      .catch(next);
  }

  remover(req: Request, res: Response, next: NextFunction): void {
    VendaControle.servico.remover(Number(req.params.id))
      .then((entidade) => { res.status(200).json(entidade); })
      .catch(next);
  }
}

export default VendaControle;
