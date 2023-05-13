import { NextFunction, Request, Response } from "express";
import CustomRequest from "../arquitetura/CustomRequest";
import Bodega from "../entidade/Bodega";
import BodegaServico from "../servico/BodegaServico";

class BodegaControle {
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

  criar(req: CustomRequest<Bodega>, res: Response, next: NextFunction): void {
    BodegaControle.servico.criar(req.body)
      .then((entidade) => { res.status(201).json(entidade); })
      .catch(next);
  }

  atualizar(req: CustomRequest<Bodega>, res: Response, next: NextFunction): void {
    BodegaControle.servico.atualizar(req.body)
      .then((entidade) => { res.status(201).json(entidade); })
      .catch(next);
  }

  remover(req: Request, res: Response, next: NextFunction): void {
    BodegaControle.servico.remover(Number(req.params.id))
      .then((entidade) => { res.status(200).json(entidade); })
      .catch(next);
  }

  async encarte(req: Request, res: Response): Promise<void> {
    const encarte = await BodegaControle.servico.encarte(Number(req.params.id));
    if (encarte == null) {
      res.status(404).send();
      return;
    }

    res.status(201).json(encarte);
  }

  async relatorioFinanceiro(req: Request, res: Response): Promise<void> {
    const relatorioFinanceiro = await BodegaControle.servico.relatorioFinanceiro(req.body.inicio, req.body.fim)
    res.status(200).json({ relatorioFinanceiro })
  }
}

export default BodegaControle;
